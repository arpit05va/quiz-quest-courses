
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { useState } from 'react';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      category: "Account & Profile",
      questions: [
        {
          question: "How do I create an account?",
          answer: "You can create an account by clicking the 'Sign Up' button in the header and choosing your role (Student, Expert, or HR). Fill in your details and verify your email to get started."
        },
        {
          question: "How do I reset my password?",
          answer: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
        },
        {
          question: "Can I change my account type after registration?",
          answer: "Yes, you can switch between different account types in your profile settings. However, some features may require verification for certain roles like HR or Expert."
        },
        {
          question: "How do I update my profile information?",
          answer: "Go to your dashboard and click on 'Profile' to update your personal information, skills, and preferences."
        }
      ]
    },
    {
      category: "Courses & Learning",
      questions: [
        {
          question: "How do I enroll in a course?",
          answer: "Browse our courses page, select a course that interests you, and click 'Enroll Now'. You can pay using various payment methods including credit cards and PayPal."
        },
        {
          question: "Can I access courses offline?",
          answer: "Currently, our courses require an internet connection. However, you can download course materials and code samples for offline reference."
        },
        {
          question: "How long do I have access to a course?",
          answer: "Once you purchase a course, you have lifetime access to all course materials and updates."
        },
        {
          question: "Do you offer certificates?",
          answer: "Yes, upon successful completion of a course including all assignments and quizzes, you'll receive a certificate of completion."
        }
      ]
    },
    {
      category: "Payment & Billing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers in supported regions."
        },
        {
          question: "Can I get a refund?",
          answer: "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied, contact support for a full refund."
        },
        {
          question: "Are there any subscription plans?",
          answer: "We offer both individual course purchases and monthly/annual subscription plans that give you access to our entire course library."
        },
        {
          question: "How do I download my invoice?",
          answer: "You can download your invoices from your account dashboard under the 'Billing' section."
        }
      ]
    },
    {
      category: "Technical Issues",
      questions: [
        {
          question: "The video player is not working. What should I do?",
          answer: "Try refreshing the page, clearing your browser cache, or switching to a different browser. If the issue persists, contact our support team."
        },
        {
          question: "I'm having trouble with the code editor.",
          answer: "Ensure you have JavaScript enabled in your browser. Try using the latest version of Chrome, Firefox, or Safari for the best experience."
        },
        {
          question: "Can I use the platform on mobile devices?",
          answer: "Yes, our platform is responsive and works on mobile devices. However, for coding exercises, we recommend using a desktop or laptop for the best experience."
        },
        {
          question: "Why is the website loading slowly?",
          answer: "This could be due to your internet connection or browser cache. Try clearing your cache, closing other tabs, or contacting support if the issue continues."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find quick answers to common questions about codeXMania
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="text-2xl">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try different keywords or browse all categories above.
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Contact our support team.
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Contact Support
              </button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
