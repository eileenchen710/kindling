import { HStack, Text, Box, useColorModeValue } from '@chakra-ui/react';
import { useRef, useState } from 'react';

function AnimatedTagButton({ selected, children, onClick, ...props }: any) {
  const bg = useColorModeValue('black', 'white');
  const color = useColorModeValue('white', 'black');
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty('--hover-x', `${x}px`);
    btn.style.setProperty('--hover-y', `${y}px`);
    btn.style.setProperty('--hover-origin', `${x}px ${y}px`);
    const d = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y)
    );
    btn.style.setProperty('--hover-diameter', `${d * 2}px`);
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      onMouseEnter={handleMouseMove}
      onMouseMove={handleMouseMove}
      style={{
        color: selected ? 'black' : color,
        background: selected
          ? 'linear-gradient(90deg, #52dafcff 0%, #1FA9FF 100%)'
          : bg,
        border: 'none',
        borderRadius: 999,
        padding: '0.22em 0.8em',
        fontWeight: 600,
        fontSize: '.95em',
        cursor: 'pointer',
        outline: selected ? '2px solid #1FA9FF' : 'none',
        position: 'relative',
        overflow: 'hidden',
        margin: '2px',
        zIndex: 0,
        transition: 'background 0.3s, color 0.3s',
      }}
      {...props}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      <span
        style={{
          content: '""',
          position: 'absolute',
          left: 'calc(var(--hover-x, 50%) - var(--hover-diameter, 0px) / 2)',
          top: 'calc(var(--hover-y, 50%) - var(--hover-diameter, 0px) / 2)',
          width: 'var(--hover-diameter, 0px)',
          height: 'var(--hover-diameter, 0px)',
          borderRadius: '50%',
          pointerEvents: 'none',
          background:
            'radial-gradient(circle, #52dafcff 0%, #1FA9FF 56%, #8980F6 100%)',
          opacity: 0.7,
          transform: 'scale(0)',
          transition: 'transform 0.45s cubic-bezier(.4,0,.2,1), opacity 0.3s',
          zIndex: 1,
        }}
        className="animated-tag-bg"
      />
    </button>
  );
}

export default function FilterPanel({
  options,
  value,
  onChange,
  label,
  resultCount,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  label?: string;
  resultCount?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const handleTagClick = (tag: string) => {
    if (value.includes(tag)) {
      onChange(value.filter((v) => v !== tag));
    } else {
      onChange([...value, tag]);
    }
  };
  const visibleTags = showAll ? options : options.slice(0, 8);
  return (
    <Box>
      <Text fontWeight={600} mb={2}>
        {label}
      </Text>
      <HStack spacing={2} flexWrap="wrap">
        {visibleTags.map((tag) => (
          <AnimatedTagButton
            key={tag}
            selected={value.includes(tag)}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </AnimatedTagButton>
        ))}
        {options.length > 8 && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            style={{
              color: '#1FA9FF',
              background: useColorModeValue('#f3f6fa', '#23272f'),
              border: '1.5px solid #1FA9FF',
              borderRadius: 999,
              padding: '0.32em 1.05em',
              fontWeight: 600,
              fontSize: '.95em',
              cursor: 'pointer',
              margin: '2px',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {showAll ? 'Show less' : 'Show more'}
          </button>
        )}
      </HStack>
      {typeof resultCount === 'number' && (
        <Text mt={2} fontSize="sm" color="gray.500" fontWeight={600}>
          Showing {resultCount} result{resultCount === 1 ? '' : 's'}
        </Text>
      )}
    </Box>
  );
}
