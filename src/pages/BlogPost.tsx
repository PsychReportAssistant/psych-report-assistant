import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";

const blogContent: Record<string, {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}> = {
  "streamline-q-global-workflow": {
    title: "How to Streamline Your Q-Global Assessment Workflow",
    author: "Dr. Emily Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
    content: `
      <p>As school psychologists, we know that assessment is only part of our job. The real challenge often lies in efficiently processing Q-Global data and generating comprehensive reports. In this guide, I'll share proven strategies that have helped me save hours every week.</p>
      
      <h2>1. Organize Your Q-Global Exports</h2>
      <p>The first step to an efficient workflow is organization. Create a consistent folder structure for your Q-Global exports:</p>
      <ul>
        <li>Organize by school year</li>
        <li>Create subfolders for each assessment type</li>
        <li>Use consistent naming conventions</li>
      </ul>
      
      <h2>2. Batch Your Exports</h2>
      <p>Instead of exporting one assessment at a time, try to batch your exports. Export all assessments for a particular student or case at once. This reduces the time spent navigating Q-Global's interface.</p>
      
      <h2>3. Use Report Generation Tools</h2>
      <p>Tools like Psych Report Assistant can dramatically reduce the time spent on report writing. By uploading your Q-Global exports, you can generate professional reports in seconds rather than hours.</p>
      
      <h2>4. Create Templates</h2>
      <p>Develop templates for common assessment combinations. Having pre-written sections for standard interpretations allows you to focus on case-specific findings.</p>
      
      <h2>5. Review and Customize</h2>
      <p>While automation is helpful, always review and customize generated reports. Add your clinical observations and ensure the report accurately reflects the student's unique situation.</p>
      
      <h2>Conclusion</h2>
      <p>By implementing these strategies, you can reclaim hours of your week while maintaining high-quality assessment reports. Remember, the goal is to work smarter, not harder, so you can focus on what matters most: helping students succeed.</p>
    `,
  },
  "wisc-v-interpretation-guide": {
    title: "WISC-V Interpretation: A Comprehensive Guide for School Psychologists",
    author: "Dr. Michael Torres",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Assessment",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60",
    content: `
      <p>The WISC-V remains one of the most widely used cognitive assessments in school psychology. This guide will help you navigate the complexities of interpretation and communicate findings effectively.</p>
      
      <h2>Understanding the Primary Index Scales</h2>
      <p>The WISC-V provides five primary index scores:</p>
      <ul>
        <li><strong>Verbal Comprehension (VCI)</strong>: Measures verbal reasoning and concept formation</li>
        <li><strong>Visual Spatial (VSI)</strong>: Assesses visual-spatial processing and reasoning</li>
        <li><strong>Fluid Reasoning (FRI)</strong>: Evaluates novel problem-solving abilities</li>
        <li><strong>Working Memory (WMI)</strong>: Measures the ability to hold and manipulate information</li>
        <li><strong>Processing Speed (PSI)</strong>: Assesses speed of visual scanning and decision-making</li>
      </ul>
      
      <h2>Interpreting Score Variability</h2>
      <p>When index scores show significant variability (15+ points), the Full Scale IQ may not be the best representation of overall cognitive ability. Consider using the General Ability Index (GAI) or the Cognitive Proficiency Index (CPI) as supplementary measures.</p>
      
      <h2>Clinical Considerations</h2>
      <p>Always consider cultural, linguistic, and environmental factors when interpreting scores. A low Processing Speed score, for example, may reflect anxiety rather than true cognitive processing limitations.</p>
      
      <h2>Communicating Results</h2>
      <p>When writing reports, focus on practical implications rather than just numbers. Parents and educators need to understand how cognitive patterns impact learning and what interventions might help.</p>
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogContent[slug] : null;

  if (!post) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Post Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button variant="default">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Button */}
      <div className="container-custom pt-6">
        <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="py-8">
        <div className="container-custom max-w-4xl">
          <header className="mb-8">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-video object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none 
              prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-ul:text-muted-foreground prose-li:text-muted-foreground
              prose-strong:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-foreground">Share this article</p>
                <p className="text-sm text-muted-foreground">Help fellow professionals discover this resource</p>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-accent/50 rounded-2xl p-8 text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Ready to Save Time on Reports?
            </h3>
            <p className="text-muted-foreground mb-4">
              Try our free Q-Global report generator and see the difference.
            </p>
            <Link to="/tool">
              <Button variant="hero">
                Try Free Tool
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
