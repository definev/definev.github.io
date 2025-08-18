// Auto-generated blog data - do not edit manually
// Generated at: 2025-08-18T08:08:22.929Z

import type { BlogData, BlogPost } from '~/utils/blog'

export const blogData: BlogData = {
  "posts": [
    {
      "id": "computer-fundamentals-part-2-memory",
      "title": "Computer Fundamentals Part 2: Memory Systems",
      "content": "\n# Computer Fundamentals Part 2: Memory Systems\n\nContinuing our Computer Fundamentals series, let's dive into the memory systems that work alongside the CPU to store and retrieve data.\n\n## The Memory Hierarchy\n\nComputer memory is organized in a hierarchy based on speed, size, and cost:\n\n### 1. Registers (Fastest, Smallest)\n- Built into the CPU\n- Store immediate data and addresses\n- Access time: < 1 nanosecond\n\n### 2. Cache Memory\n- L1 Cache: On-chip, fastest\n- L2 Cache: Slightly larger, still very fast\n- L3 Cache: Shared among cores\n\n### 3. Main Memory (RAM)\n- Random Access Memory\n- Volatile storage\n- Where active programs reside\n\n### 4. Secondary Storage (Slowest, Largest)\n- Hard drives, SSDs\n- Persistent storage\n- Long-term data retention\n\n## How Memory Works with CPU\n\n```\nCPU ←→ Cache ←→ RAM ←→ Storage\n```\n\nThe CPU follows this access pattern:\n1. Check registers first\n2. Check cache levels\n3. Access main memory (RAM)\n4. Load from storage if needed\n\n## Types of RAM\n\n### Static RAM (SRAM)\n- Used in cache memory\n- Faster but more expensive\n- Doesn't need refreshing\n\n### Dynamic RAM (DRAM)\n- Used in main memory\n- Needs periodic refreshing\n- Higher capacity, lower cost\n\n## Virtual Memory\n\nOperating systems use virtual memory to:\n- Extend available memory using storage\n- Provide memory isolation between programs\n- Enable larger programs than physical RAM allows\n\n## Memory Management\n\n### Paging\n- Memory divided into fixed-size pages\n- Efficient memory allocation\n- Reduces fragmentation\n\n### Segmentation\n- Memory divided by program structure\n- Code, data, and stack segments\n- Better reflects program organization\n\n## Performance Optimization\n\n- **Locality of Reference**: Programs tend to access nearby memory\n- **Caching**: Store frequently used data closer to CPU\n- **Prefetching**: Load data before it's needed\n\n## Memory in Modern Systems\n\n- DDR4/DDR5 RAM standards\n- Non-volatile memory (NVMe SSDs)\n- Memory compression techniques\n- NUMA (Non-Uniform Memory Access)\n\n## Coming Next\n\nIn Part 3, we'll explore the Input/Output systems and how computers communicate with the external world through peripherals and networks.\n\n---\n\n*This is part 2 of the Computer Fundamentals series. We're building a complete picture of how computers work, layer by layer.*\n",
      "excerpt": "Exploring the memory hierarchy - from registers to hard drives and how data flows through computer systems.",
      "date": "2025-07-15",
      "slug": "computer-fundamentals-part-2-memory",
      "tags": [
        "computer science",
        "hardware",
        "memory",
        "fundamentals"
      ],
      "readTime": 2,
      "published": false,
      "author": "Bùi Đại Dương (Zennn.mind)",
      "series": "Computer fundamentals",
      "seriesOrder": 2,
      "seriesSlug": "computer-fundamentals"
    },
    {
      "id": "computer-fundamentals-part-1-cpu",
      "title": "Computer Fundamentals Part 1: Understanding the CPU",
      "content": "\n# Computer Fundamentals Part 1: Understanding the CPU\n\nWelcome to the first part of our Computer Fundamentals series! In this comprehensive journey, we'll explore how computers work from the ground up. Let's start with the heart of every computer: the CPU.\n\n## What is a CPU?\n\nThe Central Processing Unit (CPU) is often called the \"brain\" of the computer. It's responsible for executing instructions and performing calculations that make your programs run.\n\n## Key Components of a CPU\n\n### 1. Control Unit (CU)\n- Manages instruction execution\n- Controls data flow between components\n- Coordinates operations\n\n### 2. Arithmetic Logic Unit (ALU)\n- Performs mathematical operations\n- Handles logical operations (AND, OR, NOT)\n- Processes comparisons\n\n### 3. Registers\n- High-speed storage locations\n- Store immediate data and instructions\n- Include special-purpose registers like Program Counter (PC)\n\n## The Fetch-Decode-Execute Cycle\n\nEvery CPU operation follows this fundamental cycle:\n\n1. **Fetch**: Retrieve instruction from memory\n2. **Decode**: Interpret the instruction\n3. **Execute**: Perform the operation\n4. **Store**: Save the result\n\n```bash\nMemory → CPU → ALU → Result\n  ↑                    ↓\n  ─── Control Unit ─────\n```\n\n## CPU Performance Factors\n\n- **Clock Speed**: Measured in GHz, determines operations per second\n- **Cache**: Fast memory for frequently accessed data\n- **Cores**: Multiple processing units for parallel execution\n- **Architecture**: 32-bit vs 64-bit instruction sets\n\n## Modern CPU Innovations\n\n- **Pipelining**: Overlapping instruction execution\n- **Superscalar**: Multiple instructions per clock cycle\n- **Branch Prediction**: Optimizing conditional operations\n- **Hyperthreading**: Logical cores for better multitasking\n\n## Next in the Series\n\nIn the next part, we'll explore memory systems and how the CPU interacts with different types of storage. Stay tuned!\n\n---\n\n*This is part 1 of the Computer Fundamentals series. Follow along to build a complete understanding of how computers work from the hardware up to the software we use daily.*\n",
      "excerpt": "Deep dive into how the Central Processing Unit works - the brain of every computer system.",
      "date": "2025-07-14",
      "slug": "computer-fundamentals-part-1-cpu",
      "tags": [
        "computer science",
        "hardware",
        "cpu",
        "fundamentals"
      ],
      "readTime": 2,
      "published": false,
      "author": "Bùi Đại Dương (Zennn.mind)",
      "series": "Computer fundamentals",
      "seriesOrder": 1,
      "seriesSlug": "computer-fundamentals"
    },
    {
      "id": "welcome-to-my-blog",
      "title": "Welcome to Zen Blog",
      "content": "Hi! I’m **Bùi Đại Dương** - but you can just call me **Zen** (it’s a nickname that makes my Vietnamese name easier to pronounce in English). I’m a fresh grad from **Phenikaa University in Vietnam**, trying to figure out this big, exciting, sometimes confusing journey into computer science.\n\nI’ve always been a curious person, and this blog is my place to share that curiosity: little discoveries, fun facts, and the ups and downs of my very early career. Think of it like a mix of notes, stories, and experiments from someone still learning the ropes.\n\n---\n\n## What’s this blog about?\n\nMostly things I find fascinating in **computer architecture**, **mobile development**, and **programming languages**. But I’ll admit-I’m also **obsessed with UI/UX design**. I love when things not only *work well* but also *look and feel great*. So don’t be surprised if some posts drift into the design side of tech too.\n\nAnd while I don’t feel like an expert yet (far from it!), I believe that being a little uncomfortable means I’m learning-and that’s a good thing. 🌱\n\n---\n\n## What’s next?\n\nI’ve been digging into some cool topics these past few months, especially around how computers really work under the hood. So, in my next few posts, I’ll take you along for a tour of the computer world-from the basics to some surprising details.\n\nStay tuned, it should be fun! 🚀\n\n---\n\n## A little fun fact\n\nOutside of tech, I’m a proud cat parent 🐾-I share my home with **three cats**, and yes, they occasionally walk across my keyboard while I’m coding. (So if you ever see some random “asdfghjkl” in my code snippets… you know who to blame 😼).\n\n![Mun, Ji, Tieu (From left to right)]({{}}/tieu-mun-ji.jpeg)\n\n---\n\n## Let’s connect!\n\nI’d love to hear from you-questions, ideas, random thoughts, or just a “hi.” You can find me here:\n\n* **GitHub**: [github.com/definev](https://github.com/definev)\n* **LinkedIn**: [linkedin.com/in/definev](https://linkedin.com/in/definev)\n* **Twitter**: [@definev2](https://twitter.com/definev2)\n\nThanks for reading, and welcome aboard this journey-I’m glad you’re here. 🙌",
      "excerpt": "This is the first post on my technical blog where I'll share insights about software development, programming, and technology.",
      "date": "2025-07-11",
      "slug": "welcome-to-my-blog",
      "tags": [
        "introduction",
        "blog",
        "welcome"
      ],
      "readTime": 2,
      "published": true,
      "author": "Bùi Đại Dương (Zennn.mind)"
    }
  ],
  "generatedAt": "2025-08-18T08:08:22.929Z",
  "totalPosts": 3
} as BlogData

export const blogPosts: BlogPost[] = blogData.posts

export default blogData
