import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Define custom components for styling (using 'any' for now)
const customComponents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h1: ({ ...props }: any) => <h1 className="font-cormorant text-sm leading-[1.5] text-[#D4AF37] mb-4 mt-6" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h2: ({ ...props }: any) => <h2 className="font-cormorant text-sm leading-[1.5] text-[#D4AF37] mb-3 mt-5" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h3: ({ ...props }: any) => <h3 className="font-cormorant text-sm leading-[1.5] text-[#D4AF37] mb-2 mt-4" {...props} />,
  // Add h4, h5, h6 if needed with similar styles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p: ({ ...props }: any) => <p className="font-dm-sans text-xs leading-[1.5] text-white mb-4" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ul: ({ ...props }: any) => <ul className="font-dm-sans text-xs leading-[1.5] text-white list-disc pl-5 mb-4" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ol: ({ ...props }: any) => <ol className="font-dm-sans text-xs leading-[1.5] text-white list-decimal pl-5 mb-4" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  li: ({ ...props }: any) => <li className="mb-1" {...props} />,
  // Add other elements like blockquote, code, etc. if needed
};

const TermsOfServicePage = () => {
  const filePath = path.join(process.cwd(), 'legal', 'ru_terms_of_service.md');
  let markdownContent = '';

  try {
    markdownContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading terms of service file:', error);
    return <p className="text-red-500">Error loading terms of service.</p>; // Added error styling
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-black min-h-screen"> {/* Added bg-black and min-h-screen */}
      {/* Removed prose classes */}
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customComponents}>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default TermsOfServicePage;
