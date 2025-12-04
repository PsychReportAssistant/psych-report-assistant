import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

const blogPosts = [
  {
    slug: "streamline-q-global-workflow",
    title: "How to Streamline Your Q-Global Assessment Workflow",
    excerpt: "Learn the best practices for managing Q-Global exports and generating reports efficiently. Save hours every week with these proven strategies.",
    author: "Dr. Emily Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "wisc-v-interpretation-guide",
    title: "WISC-V Interpretation: A Comprehensive Guide for School Psychologists",
    excerpt: "Master the art of WISC-V interpretation with this detailed guide covering index scores, subtests, and clinical considerations.",
    author: "Dr. Michael Torres",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Assessment",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "slp-assessment-best-practices",
    title: "Best Practices for SLP Assessments in Schools",
    excerpt: "A comprehensive overview of assessment best practices for Speech-Language Pathologists working in educational settings.",
    author: "Sarah Johnson, M.S., CCC-SLP",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "SLP",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "basc-3-report-writing",
    title: "Writing Effective BASC-3 Reports: Tips and Templates",
    excerpt: "Learn how to write clear, comprehensive BASC-3 reports that communicate findings effectively to parents and educators.",
    author: "Dr. Amanda Williams",
    date: "2024-01-01",
    readTime: "7 min read",
    category: "Report Writing",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "time-management-school-psychologists",
    title: "Time Management Strategies for Busy School Psychologists",
    excerpt: "Practical time management techniques to help school psychologists balance assessments, consultations, and paperwork.",
    author: "Dr. David Park",
    date: "2023-12-28",
    readTime: "4 min read",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "understanding-cognitive-assessments",
    title: "Understanding Cognitive Assessments: A Parent's Guide",
    excerpt: "Help parents understand cognitive assessments with this clear, jargon-free guide you can share with families.",
    author: "Dr. Jennifer Lee",
    date: "2023-12-20",
    readTime: "5 min read",
    category: "Resources",
    image: "https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=800&auto=format&fit=crop&q=60",
  },
];

const Blog = () => {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Psych Assessment Blog
            </h1>
            <p className="text-muted-foreground">
              Tips, guides, and best practices for school psychologists, psychologists, 
              and speech-language pathologists.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container-custom">
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="group block bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-video md:aspect-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <span className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
                  Featured • {featuredPost.category}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Get the latest tips and resources for school psychologists and SLPs delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
