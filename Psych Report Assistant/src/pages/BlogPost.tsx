import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { getBlogPost, getAllBlogPosts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowLeft, Tag, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { marked } from "marked";
import { useEffect, useState } from "react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;
  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 2);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Psych Report Assistant`;
      const parseContent = async () => {
        const html = await marked(post.content);
        setHtmlContent(html);
      };
      parseContent();
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Layout>
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none 
                prose-headings:text-foreground prose-headings:font-semibold
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-li:marker:text-primary
                prose-table:border-border prose-th:bg-secondary prose-th:text-foreground
                prose-td:border-border prose-th:border-border
                prose-code:text-primary prose-code:bg-secondary prose-code:px-1 prose-code:rounded
                prose-pre:bg-secondary prose-pre:border prose-pre:border-border"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Keywords */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 rounded-full bg-secondary text-sm flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3 text-primary" />
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Card variant="glow" className="mt-12">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Streamline Your Reports?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try our free Q-Global report generator and save hours on psychological assessment report writing.
                </p>
                <Button asChild variant="hero" size="lg">
                  <Link to="/tool">Try Free Tool</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`}>
                      <Card variant="glass" className="h-full hover:border-primary/30 transition-colors">
                        <CardContent className="p-6">
                          <span className="text-xs text-primary font-medium">
                            {relatedPost.category}
                          </span>
                          <h4 className="font-semibold mt-2 mb-2 line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.description,
            "author": {
              "@type": "Organization",
              "name": post.author
            },
            "datePublished": post.date,
            "publisher": {
              "@type": "Organization",
              "name": "Psych Report Assistant",
              "url": "https://psychreportassistant.com"
            },
            "keywords": post.keywords.join(", ")
          })
        }}
      />
    </Layout>
  );
}
