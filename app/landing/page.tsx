"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Activity, Shield, Calendar, MessageSquare, FileText, ChevronDown, Star } from "lucide-react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="px-4 py-1.5 text-sm font-medium">Blockchain Secured Health Records</Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your Complete <span className="gradient-text">Healthcare</span> Companion
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Track your mental and physical health, manage appointments, and securely store your medical records all
                in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/onboarding">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/">Explore Features</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-card rounded-2xl overflow-hidden border shadow-xl">
                  <img src="/images/dashboard-preview.png" alt="Healthcare Dashboard" className="w-full h-auto" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4">Key Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Health Management</h2>
            <p className="text-muted-foreground">
              Our platform offers a complete suite of tools to help you monitor and improve your health.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-10 w-10 text-primary" />,
                title: "Mental Health Tracking",
                description:
                  "Monitor your mood patterns and get personalized recommendations for improving your mental wellbeing.",
                delay: 0.2,
              },
              {
                icon: <Activity className="h-10 w-10 text-secondary" />,
                title: "Symptom Checker",
                description: "Identify possible conditions based on your symptoms with our AI-powered analysis tool.",
                delay: 0.4,
              },
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Secure Health Records",
                description: "Store and access your medical records securely with blockchain technology.",
                delay: 0.6,
              },
              {
                icon: <Calendar className="h-10 w-10 text-secondary" />,
                title: "Appointment Management",
                description: "Schedule and manage healthcare appointments with ease.",
                delay: 0.8,
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-primary" />,
                title: "Doctor Communication",
                description: "Chat directly with your healthcare providers in a secure environment.",
                delay: 1.0,
              },
              {
                icon: <FileText className="h-10 w-10 text-secondary" />,
                title: "Prescription Management",
                description: "Keep track of your medications and receive timely refill reminders.",
                delay: 1.2,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full overflow-hidden border-none shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Steps to Better Health</h2>
            <p className="text-muted-foreground">Our platform makes it easy to take control of your health journey.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted hidden md:block" />

            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and complete your health profile with relevant medical history.",
                delay: 0.2,
              },
              {
                step: "02",
                title: "Connect with Providers",
                description: "Add your healthcare providers to enable secure communication and record sharing.",
                delay: 0.4,
              },
              {
                step: "03",
                title: "Monitor Your Health",
                description: "Track your physical and mental health metrics to gain valuable insights.",
                delay: 0.6,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
              >
                <div className="bg-card rounded-lg p-8 border shadow-md h-full">
                  <div className="text-4xl font-bold text-primary/20 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground">
              Hear from people who have transformed their healthcare experience with our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This app has completely changed how I manage my health. The mental health tracking feature has been especially helpful.",
                name: "Sarah Johnson",
                role: "Patient",
                rating: 5,
                delay: 0.2,
              },
              {
                quote:
                  "As a doctor, I appreciate how easy it is to communicate with my patients and access their health records securely.",
                name: "Dr. Michael Chen",
                role: "Cardiologist",
                rating: 5,
                delay: 0.4,
              },
              {
                quote:
                  "The symptom checker helped me identify a condition early. The interface is intuitive and the blockchain security gives me peace of mind.",
                name: "Emma Davis",
                role: "Patient",
                rating: 4,
                delay: 0.6,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: testimonial.delay }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex space-x-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                    <div className="pt-4">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who have transformed their healthcare experience with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/onboarding">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find answers to common questions about our healthcare platform.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Is my health data secure?",
                answer:
                  "Yes, we use blockchain technology to ensure your health records are securely stored and encrypted. You control who has access to your information.",
                delay: 0.2,
              },
              {
                question: "How accurate is the symptom checker?",
                answer:
                  "Our symptom checker uses advanced AI algorithms trained on medical data to provide possible conditions. However, it's not a substitute for professional medical advice.",
                delay: 0.3,
              },
              {
                question: "Can I share my health records with my doctor?",
                answer:
                  "Yes, you can securely share your health records with healthcare providers of your choice. They will need to verify their identity to access your information.",
                delay: 0.4,
              },
              {
                question: "Is the app available on mobile devices?",
                answer:
                  "Yes, our platform is fully responsive and works on all devices including smartphones and tablets. We also offer native mobile apps for iOS and Android.",
                delay: 0.5,
              },
              {
                question: "How do I schedule an appointment?",
                answer:
                  "You can schedule appointments directly through the app. Simply navigate to the Appointments section, select your healthcare provider, and choose an available time slot.",
                delay: 0.6,
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: faq.delay }}
              >
                <Accordion question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold gradient-text">HealthCare</h2>
              <p className="text-muted-foreground mt-2">Your complete health companion</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h3 className="font-medium mb-3">Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Mental Health</li>
                  <li>Symptom Checker</li>
                  <li>Health Records</li>
                  <li>Doctor Portal</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>About Us</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
            <p>© 2025 HealthCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 text-muted-foreground border-t">{answer}</div>
      </motion.div>
    </div>
  )
}
