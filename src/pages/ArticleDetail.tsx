
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Eye, Heart, Star, Clock, User } from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock article data - in a real app, this would come from an API
  const article = {
    id: Number(id),
    title: '10 Web Development Trends in 2024',
    excerpt: 'Discover the latest trends shaping the future of web development including AI integration, serverless architecture, and progressive web apps.',
    content: `
      The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies. Here are the top 10 trends that are shaping the future of web development:

      ## 1. AI Integration in Web Development
      
      Artificial Intelligence is no longer just a buzzword. In 2024, we're seeing AI being integrated into every aspect of web development, from automated code generation to intelligent user experience optimization.

      ## 2. Serverless Architecture
      
      Serverless computing continues to gain momentum, allowing developers to focus on writing code without worrying about server management. This trend is particularly strong with platforms like Vercel, Netlify, and AWS Lambda.

      ## 3. Progressive Web Apps (PWAs)
      
      PWAs are bridging the gap between web and mobile applications, offering native-like experiences while maintaining the accessibility of web applications.

      ## 4. WebAssembly (WASM)
      
      WebAssembly is enabling high-performance applications in the browser, opening up new possibilities for complex web applications that were previously only possible with native code.

      ## 5. Micro-Frontends
      
      The micro-frontend architecture is gaining popularity as it allows teams to work independently on different parts of a web application, improving scalability and maintainability.

      ## 6. JAMstack Evolution
      
      The JAMstack (JavaScript, APIs, and Markup) architecture continues to evolve, with new tools and frameworks making it easier to build fast, secure, and scalable web applications.

      ## 7. Enhanced Web Security
      
      With increasing cyber threats, web security is becoming more critical than ever. New security protocols and best practices are being developed to protect web applications and user data.

      ## 8. Voice User Interfaces
      
      Voice interfaces are becoming more common in web applications, providing new ways for users to interact with websites and web applications.

      ## 9. Motion UI and Animations
      
      Sophisticated animations and motion design are becoming standard in web development, improving user engagement and creating more immersive experiences.

      ## 10. Sustainability in Web Development
      
      Green web development practices are gaining attention as developers become more conscious of the environmental impact of their applications.

      ## Conclusion
      
      These trends represent the current direction of web development and offer exciting opportunities for developers to create better, faster, and more engaging web experiences. Staying updated with these trends will be crucial for any web developer looking to remain competitive in 2024 and beyond.
    `,
    author: 'John Smith',
    readTime: '5 min read',
    publishedDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    tags: ['Web Development', 'Trends', 'Technology'],
    views: 2580,
    likes: 154,
    bookmarked: false
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article>
              {/* Article Header */}
              <div className="mb-8">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-4xl font-bold text-foreground mb-4">{article.title}</h1>
                
                <div className="flex items-center space-x-6 text-muted-foreground mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>By {article.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center space-x-6 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{article.views} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>{article.likes} likes</span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <pre className="whitespace-pre-wrap font-sans leading-relaxed">{article.content}</pre>
                  </div>
                </CardContent>
              </Card>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Article Actions */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Like Article
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  {article.bookmarked ? 'Remove Bookmark' : 'Bookmark'}
                </Button>
                
                <Button className="w-full" variant="outline">
                  Share Article
                </Button>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="cursor-pointer hover:bg-muted/50 p-2 rounded">
                    <h4 className="font-medium text-sm">The Future of AI in Education</h4>
                    <p className="text-xs text-muted-foreground">7 min read</p>
                  </div>
                  <div className="cursor-pointer hover:bg-muted/50 p-2 rounded">
                    <h4 className="font-medium text-sm">Building Responsive Websites</h4>
                    <p className="text-xs text-muted-foreground">6 min read</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
