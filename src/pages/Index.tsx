import { useState, useEffect } from 'react';
import Header from '@/components/BunnyArt/Header';
import Footer from '@/components/BunnyArt/Footer';
import HomeSection from '@/components/BunnyArt/HomeSection';
import GallerySection from '@/components/BunnyArt/GallerySection';
import NewsSection from '@/components/BunnyArt/NewsSection';
import ContactSection from '@/components/BunnyArt/ContactSection';
import MediaModal from '@/components/BunnyArt/MediaModal';

const MEDIA_API = 'https://functions.poehali.dev/70267a36-8967-4037-bd39-69cef143b46d';

type Section = 'home' | 'photos' | 'videos' | 'tracks' | 'texts' | 'news' | 'contact';

interface MediaItem {
  id: number;
  title: string;
  type: 'photo' | 'video' | 'track' | 'text';
  url: string;
  thumbnail?: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export default function Index() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [commentText, setCommentText] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const response = await fetch(MEDIA_API);
      const data = await response.json();
      setMediaItems(data.map((item: any) => ({
        ...item,
        comments: []
      })));
    } catch (error) {
      console.error('Failed to load media:', error);
    }
  };

  const handleLike = async (itemId: number) => {
    const item = mediaItems.find(i => i.id === itemId);
    if (!item) return;

    try {
      await fetch(MEDIA_API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: itemId,
          likes: item.likes + 1
        })
      });
      
      setMediaItems(prev => prev.map(i => 
        i.id === itemId ? { ...i, likes: i.likes + 1 } : i
      ));
      
      if (selectedItem?.id === itemId) {
        setSelectedItem({ ...selectedItem, likes: selectedItem.likes + 1 });
      }
    } catch (error) {
      console.error('Failed to like:', error);
    }
  };

  const handleComment = (itemId: number) => {
    if (commentText.trim()) {
      console.log(`Comment on item ${itemId}: ${commentText}`);
      setCommentText('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />

      <main className="container mx-auto px-4 py-12">
        {currentSection === 'home' && (
          <HomeSection 
            mediaItems={mediaItems}
            onItemClick={setSelectedItem}
            onLike={handleLike}
          />
        )}
        {currentSection === 'photos' && (
          <GallerySection 
            type="photo"
            mediaItems={mediaItems}
            onItemClick={setSelectedItem}
            onLike={handleLike}
          />
        )}
        {currentSection === 'videos' && (
          <GallerySection 
            type="video"
            mediaItems={mediaItems}
            onItemClick={setSelectedItem}
            onLike={handleLike}
          />
        )}
        {currentSection === 'tracks' && (
          <GallerySection 
            type="track"
            mediaItems={mediaItems}
            onItemClick={setSelectedItem}
            onLike={handleLike}
          />
        )}
        {currentSection === 'texts' && (
          <GallerySection 
            type="text"
            mediaItems={mediaItems}
            onItemClick={setSelectedItem}
            onLike={handleLike}
          />
        )}
        {currentSection === 'news' && <NewsSection />}
        {currentSection === 'contact' && <ContactSection />}
      </main>

      <Footer />

      <MediaModal
        item={selectedItem}
        commentText={commentText}
        onClose={() => setSelectedItem(null)}
        onLike={handleLike}
        onComment={handleComment}
        onCommentChange={setCommentText}
      />
    </div>
  );
}