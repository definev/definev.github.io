---
title: "Computer Fundamentals Part 2: Memory Systems"
excerpt: "Exploring the memory hierarchy - from registers to hard drives and how data flows through computer systems."
date: "2025-07-15"
tags: ["computer science", "hardware", "memory", "fundamentals"]
published: false
author: "Bùi Đại Dương (Zennn.mind)"
series: "computer-fundamentals"
seriesOrder: 2
---

# Computer Fundamentals Part 2: Memory Systems

Continuing our Computer Fundamentals series, let's dive into the memory systems that work alongside the CPU to store and retrieve data.

## The Memory Hierarchy

Computer memory is organized in a hierarchy based on speed, size, and cost:

### 1. Registers (Fastest, Smallest)
- Built into the CPU
- Store immediate data and addresses
- Access time: < 1 nanosecond

### 2. Cache Memory
- L1 Cache: On-chip, fastest
- L2 Cache: Slightly larger, still very fast
- L3 Cache: Shared among cores

### 3. Main Memory (RAM)
- Random Access Memory
- Volatile storage
- Where active programs reside

### 4. Secondary Storage (Slowest, Largest)
- Hard drives, SSDs
- Persistent storage
- Long-term data retention

## How Memory Works with CPU

```
CPU ←→ Cache ←→ RAM ←→ Storage
```

The CPU follows this access pattern:
1. Check registers first
2. Check cache levels
3. Access main memory (RAM)
4. Load from storage if needed

## Types of RAM

### Static RAM (SRAM)
- Used in cache memory
- Faster but more expensive
- Doesn't need refreshing

### Dynamic RAM (DRAM)
- Used in main memory
- Needs periodic refreshing
- Higher capacity, lower cost

## Virtual Memory

Operating systems use virtual memory to:
- Extend available memory using storage
- Provide memory isolation between programs
- Enable larger programs than physical RAM allows

## Memory Management

### Paging
- Memory divided into fixed-size pages
- Efficient memory allocation
- Reduces fragmentation

### Segmentation
- Memory divided by program structure
- Code, data, and stack segments
- Better reflects program organization

## Performance Optimization

- **Locality of Reference**: Programs tend to access nearby memory
- **Caching**: Store frequently used data closer to CPU
- **Prefetching**: Load data before it's needed

## Memory in Modern Systems

- DDR4/DDR5 RAM standards
- Non-volatile memory (NVMe SSDs)
- Memory compression techniques
- NUMA (Non-Uniform Memory Access)

## Coming Next

In Part 3, we'll explore the Input/Output systems and how computers communicate with the external world through peripherals and networks.

---

*This is part 2 of the Computer Fundamentals series. We're building a complete picture of how computers work, layer by layer.*
