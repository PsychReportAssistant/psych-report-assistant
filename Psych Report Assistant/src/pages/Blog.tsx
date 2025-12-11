import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getAllBlogPosts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

export default function Blog() {
  const posts = getAllBlogPosts();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              School Psychology <span className="text-primary">Blog</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Expert guides on WISC-V scoring, Q-Global, psychological assessment, and report writing for school psychologists.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {posts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}>
                <Card 
                  variant="glow" 
                  className="h-full group hover:scale-[1.02] transition-transform duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Keywords Section */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Topics We Cover</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "WISC-V Scoring",
                "Q-Global Reports",
                "Standard Scores",
                "Percentile Ranks",
                "Psychological Assessment",
                "School Psychology",
                "Cognitive Testing",
                "Report Writing",
              ].map((topic) => (
                <span
                  key={topic}
                  className="px-4 py-2 rounded-full bg-secondary text-sm flex items-center gap-1"
                >
                  <Tag className="w-3 h-3 text-primary" />
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
