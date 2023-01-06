import { motion, Reorder } from "framer-motion";
import type { ComponentPropsWithRef, PropsWithChildren } from "react";
import { useState } from "react";

const pathProps = {
  initial: {
    pathLength: 0,
    visibility: "hidden",
  },
  animate: {
    pathLength: 1,
    visibility: "visible",
    transition: {
      duration: 1,
      delay: 0.2,
    },
  },
} as const;

type ItemProps = ComponentPropsWithRef<typeof Reorder.Item>;

const Item = ({ children, ...props }: ItemProps) => (
  <Reorder.Item
    {...props}
    whileHover="hover"
    whileTap="tap"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      hover: {
        scale: 1.5,
      },
      tap: {
        scale: 1.8,
      },
    }}
    className="relative"
  >
    <div className="absolute inset-0 scale-125 rounded-full bg-slate-800" />

    {children}
  </Reorder.Item>
);

const CodeItem = (props: ItemProps) => (
  <Item {...props}>
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 relative"
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        {...pathProps}
      />
    </motion.svg>
  </Item>
);

const MusicItem = (props: ItemProps) => (
  <Item {...props}>
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 relative"
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
        {...pathProps}
      />
    </motion.svg>
  </Item>
);

const HomeItem = (props: ItemProps) => (
  <Item {...props}>
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 relative"
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        {...pathProps}
      />
    </motion.svg>
  </Item>
);

const defaultItems: [string, (props: ItemProps) => JSX.Element][] = [
  ["home", HomeItem],
  ["code", CodeItem],
  ["Music", MusicItem],
];

const Dock = () => {
  const [items, setItems] = useState(defaultItems);

  return (
    <motion.nav
      layout
      className="flex h-16 mt-8 mx-auto rounded-2xl border-slate-800 bg-slate-900 border-2"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
          transition: {
            when: "afterChildren",
          },
        },
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            delay: 0.5,
            staggerChildren: 1,
          },
        },
      }}
    >
      <Reorder.Group
        className="flex h-full w-full items-center justify-center px-4 text-slate-400 gap-4"
        axis="x"
        values={[...items]}
        onReorder={setItems}
      >
        {items.map((item) => {
          const [key, Component] = item;
          return <Component key={key} value={item} />;
        })}
      </Reorder.Group>
    </motion.nav>
  );
};

export default Dock;
