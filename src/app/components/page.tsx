// Note: Using aceternity-ui CLI to add individual components directly

export default function Components() {
  // Sample data for AnimatedTooltip
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "UX Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      id: 3,
      name: "Alex Johnson",
      designation: "Product Manager",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    },
  ];

  // Sample content for StickyScroll
  const content = [
    {
      title: "Collaborative Editing",
      description:
        "Work together in real time with your team, no matter where they are located.",
    },
    {
      title: "Smart Automation",
      description:
        "Let AI handle repetitive tasks while you focus on the creative aspects.",
    },
    {
      title: "Advanced Analytics",
      description:
        "Gain insights into project performance and team productivity.",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center gap-16 p-12 min-h-screen">
      <h1 className="text-3xl font-bold">Aceternity UI Components</h1>

      <p className="text-center max-w-2xl">
        To use Aceternity UI components, you need to install them individually
        using the CLI. Run{" "}
        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          npx aceternity-ui@latest add [component-name]
        </code>
        to add specific components to your project.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-2">AnimatedTooltip</h3>
          <p className="text-gray-600 dark:text-gray-300">
            A tooltip component with smooth animations and customizable content.
          </p>
        </div>

        <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-2">CardHoverEffect</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Cards with beautiful hover effects to highlight content.
          </p>
        </div>

        <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-2">SparklesCore</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Add sparkle effects to any part of your UI for visual interest.
          </p>
        </div>

        <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-2">StickyScroll</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Content that sticks to the viewport while scrolling for better UX.
          </p>
        </div>
      </div>

      <p className="text-center max-w-2xl mt-4">
        Check out the full list of components at{" "}
        <a
          href="https://ui.aceternity.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          ui.aceternity.com
        </a>
      </p>
    </main>
  );
}
