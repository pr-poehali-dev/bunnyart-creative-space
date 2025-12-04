import json
import os
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    API для управления медиа-контентом (фото, видео, треки, тексты)
    Поддерживает GET (список/элемент), POST (создание), PUT (обновление), DELETE (удаление)
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            media_id = params.get('id')
            media_type = params.get('type')
            
            if media_id:
                cursor.execute(
                    'SELECT * FROM media_items WHERE id = %s',
                    (media_id,)
                )
                item = cursor.fetchone()
                
                if not item:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Item not found'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute(
                    'SELECT id, author, text, created_at FROM comments WHERE media_id = %s ORDER BY created_at DESC',
                    (media_id,)
                )
                comments = cursor.fetchall()
                
                result = dict(item)
                result['comments'] = [dict(c) for c in comments]
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(result, default=str),
                    'isBase64Encoded': False
                }
            
            query = 'SELECT id, title, type, url, thumbnail, likes, created_at FROM media_items'
            params_list = []
            
            if media_type:
                query += ' WHERE type = %s'
                params_list.append(media_type)
            
            query += ' ORDER BY created_at DESC'
            
            cursor.execute(query, params_list)
            items = cursor.fetchall()
            
            for item in items:
                cursor.execute(
                    'SELECT COUNT(*) as count FROM comments WHERE media_id = %s',
                    (item['id'],)
                )
                item['comments_count'] = cursor.fetchone()['count']
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(i) for i in items], default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            title = body.get('title')
            media_type = body.get('type')
            url = body.get('url')
            thumbnail = body.get('thumbnail', url)
            
            if not all([title, media_type, url]):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                '''INSERT INTO media_items (title, type, url, thumbnail, likes) 
                   VALUES (%s, %s, %s, %s, 0) RETURNING id, title, type, url, thumbnail, likes, created_at''',
                (title, media_type, url, thumbnail)
            )
            new_item = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(new_item), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            media_id = body.get('id')
            
            if not media_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing id'}),
                    'isBase64Encoded': False
                }
            
            update_fields = []
            params_list = []
            
            if 'title' in body:
                update_fields.append('title = %s')
                params_list.append(body['title'])
            if 'type' in body:
                update_fields.append('type = %s')
                params_list.append(body['type'])
            if 'url' in body:
                update_fields.append('url = %s')
                params_list.append(body['url'])
            if 'thumbnail' in body:
                update_fields.append('thumbnail = %s')
                params_list.append(body['thumbnail'])
            if 'likes' in body:
                update_fields.append('likes = %s')
                params_list.append(body['likes'])
            
            if not update_fields:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'No fields to update'}),
                    'isBase64Encoded': False
                }
            
            update_fields.append('updated_at = CURRENT_TIMESTAMP')
            params_list.append(media_id)
            
            cursor.execute(
                f'UPDATE media_items SET {", ".join(update_fields)} WHERE id = %s RETURNING *',
                params_list
            )
            updated_item = cursor.fetchone()
            conn.commit()
            
            if not updated_item:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Item not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(updated_item), default=str),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
