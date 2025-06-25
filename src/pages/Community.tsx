
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Users, Github, Twitter, Youtube, BookOpen, Award, Heart } from 'lucide-react';

const Community = () => {
  const communityPlatforms = [
    {
      icon: MessageCircle,
      name: "Discord Server",
      description: "Join our active Discord community with 10,000+ developers",
      members: "10,000+ members",
      features: ["Real-time chat", "Study groups", "Code reviews", "Job discussions"],
      color: "bg-purple-500",
      link: "#"
    },
    {
      icon: Github,
      name: "GitHub Community",
      description: "Contribute to open source projects and collaborate on code",
      members: "5,000+ contributors",
      features: ["Open source projects", "Code contributions", "Issue discussions", "Project showcases"],
      color: "bg-gray-800",
      link: "#"
    },
    {
      icon: Users,
      name: "Forum",
      description: "Ask questions, share knowledge, and connect with peers",
      members: "15,000+ posts",
      features: ["Q&A discussions", "Knowledge sharing", "Expert advice", "Career guidance"],
      color: "bg-blue-500",
      link: "#"
    },
    {
      icon: Twitter,
      name: "Twitter Community",
      description: "Follow us for updates, tips, and community highlights",
      members: "25,000+ followers",
      features: ["Daily coding tips", "Community spotlights", "Industry news", "Live updates"],
      color: "bg-sky-500",
      link: "#"
    }
  ];

  const communityStats = [
    { icon: Users, label: "Active Members", value: "50,000+" },
    { icon: MessageCircle, label: "Monthly Discussions", value: "10,000+" },
    { icon: BookOpen, label: "Shared Resources", value: "5,000+" },
    { icon: Award, label: "Success Stories", value: "1,000+" }
  ];

  const contributeWays = [
    {
      title: "Share Your Knowledge",
      description: "Write tutorials, answer questions, and help fellow learners",
      icon: BookOpen
    },
    {
      title: "Mentor Others",
      description: "Guide newcomers and share your coding journey",
      icon: Users
    },
    {
      title: "Contribute Code",
      description: "Help improve our platform and open source projects",
      icon: Github
    },
    {
      title: "Spread the Word",
      description: "Share codeXMania with friends and on social media",
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
            <p className="text-xl text-muted-foreground">
              Connect with thousands of developers, share knowledge, and grow together
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Community Platforms */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Community Platforms</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {communityPlatforms.map((platform, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center`}>
                        <platform.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{platform.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{platform.members}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{platform.description}</p>
                    <div className="space-y-2 mb-4">
                      {platform.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors">
                      Join Now
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How to Contribute */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">How You Can Contribute</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contributeWays.map((way, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <way.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{way.title}</h3>
                    <p className="text-sm text-muted-foreground">{way.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Guidelines */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">✅ Do:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Be respectful and inclusive</li>
                    <li>• Share knowledge and help others</li>
                    <li>• Ask questions when you need help</li>
                    <li>• Give constructive feedback</li>
                    <li>• Follow platform-specific rules</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">❌ Don't:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Spam or self-promote excessively</li>
                    <li>• Share inappropriate content</li>
                    <li>• Discriminate or harass others</li>
                    <li>• Share copyrighted material</li>
                    <li>• Spread misinformation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
