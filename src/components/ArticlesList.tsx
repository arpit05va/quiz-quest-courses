
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Heart, Star, ExternalLink } from 'lucide-react';

const ArticlesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: '10 Web Development Trends in 2024',
      excerpt: 'Discover the latest trends shaping the future of web development including AI integration, serverless architecture, and progressive web apps...',
      author: 'John Smith',
      readTime: '5 min read',
      publishedDate: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      tags: ['Web Development', 'Trends', 'Technology'],
      views: 2580,
      likes: 154,
      bookmarked: false
    },
    {
      id: 2,
      title: 'The Future of AI in Education',
      excerpt: 'How artificial intelligence is transforming online learning experiences through personalized content, adaptive learning paths, and intelligent tutoring systems...',
      author: 'Jane Doe',
      readTime: '7 min read',
      publishedDate: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
      tags: ['AI', 'Education', 'Machine Learning'],
      views: 3240,
      likes: 298,
      bookmarked: true
    },
    {
      id: 3,
      title: 'Building Responsive Websites',
      excerpt: 'Best practices for creating websites that work seamlessly across all devices using modern CSS techniques, flexible layouts, and mobile-first design...',
      author: 'Mike Johnson',
      readTime: '6 min read',
      publishedDate: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
      tags: ['CSS', 'Responsive Design', 'Mobile'],
      views: 1870,
      likes: 112,
      bookmarked: false
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleReadArticle = (articleId: number) => {
    navigate(`/article/${articleId}`);
  };

  const handleBookmarkArticle = (articleId: number) => {
    console.log(`Bookmarking article ${articleId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-4 md:mb-0">
          Latest Articles & Insights
        </h2>
        
        <div className="max-w-md w-full md:w-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 pr-4 py-3 w-full rounded-full border-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredArticles.map((article, index) => (
          <Card key={article.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover-lift cursor-pointer" onClick={() => handleReadArticle(article.id)}>
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </div>
              <CardContent className="md:w-2/3 p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkArticle(article.id);
                    }}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Star className={`w-4 h-4 ${article.bookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <span>By {article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{article.likes}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(article.publishedDate).toLocaleDateString()}
                  </span>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadArticle(article.id);
                    }}
                    className="flex items-center space-x-2"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;
