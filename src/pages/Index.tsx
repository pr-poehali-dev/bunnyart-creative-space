import { useState } from 'react';
import Header from '@/components/BunnyArt/Header';
import Footer from '@/components/BunnyArt/Footer';
import HomeSection from '@/components/BunnyArt/HomeSection';
import GallerySection from '@/components/BunnyArt/GallerySection';
import NewsSection from '@/components/BunnyArt/NewsSection';
import ContactSection from '@/components/BunnyArt/ContactSection';
import MediaModal from '@/components/BunnyArt/MediaModal';

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

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      title: 'Творческий абстракт',
      type: 'photo',
      url: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/353ce9a4-1531-4786-8e2d-ee8d9c0ac902.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/353ce9a4-1531-4786-8e2d-ee8d9c0ac902.jpg',
      likes: 42,
      comments: []
    },
    {
      id: 2,
      title: 'Художественная мастерская',
      type: 'photo',
      url: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/9f64844c-a47c-4328-bdce-9535945373d1.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/9f64844c-a47c-4328-bdce-9535945373d1.jpg',
      likes: 38,
      comments: []
    },
    {
      id: 3,
      title: 'Музыкальная студия',
      type: 'track',
      url: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/7fc17d9c-3bb2-41d9-85bc-f67e7857b5fd.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/7fc17d9c-3bb2-41d9-85bc-f67e7857b5fd.jpg',
      likes: 56,
      comments: []
    }
  ];

  const handleLike = (itemId: number) => {
    console.log(`Liked item ${itemId}`);
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
