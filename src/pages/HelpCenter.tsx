
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MessageCircle, Book, Search, Users } from 'lucide-react';

const HelpCenter = () => {
  const helpSections = [
    {
      icon: Search,
      title: "Getting Started",
      description: "Learn the basics of using codeXMania platform",
      items: ["Account Setup", "Course Navigation", "Payment Methods", "Profile Management"]
    },
    {
      icon: Book,
      title: "Learning Resources",
      description: "Access tutorials, documentation, and guides",
      items: ["Video Tutorials", "Documentation", "Practice Problems", "Code Examples"]
    },
    {
      icon: MessageCircle,
      title: "Technical Support",
      description: "Get help with technical issues and bugs",
      items: ["Report a Bug", "Platform Issues", "Browser Compatibility", "Performance Problems"]
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with other learners and instructors",
      items: ["Discussion Forums", "Study Groups", "Peer Mentoring", "Expert Connect"]
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "support@codexmania.com",
      detail: "Response within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+1 (555) 123-4567",
      detail: "Mon-Fri, 9 AM - 6 PM EST"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Available 24/7",
      detail: "Instant support for urgent issues"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground">
              Find answers, get support, and learn how to make the most of codeXMania
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {helpSections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <section.icon className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Support</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <method.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{method.title}</h3>
                    <p className="text-muted-foreground mb-2">{method.description}</p>
                    <p className="text-sm text-muted-foreground">{method.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">Still Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Our support team is here to help you succeed.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Submit a Ticket
                </button>
                <button className="border border-primary text-primary px-6 py-2 rounded-md hover:bg-primary/10 transition-colors">
                  Browse FAQs
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
