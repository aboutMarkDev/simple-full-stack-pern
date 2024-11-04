const Footer = () => {
  return (
    <footer className="px-8 py-5 h-[8rem] flex items-center justify-center w-full max-w-7xl mx-auto">
      <h3 className="italic font-medium">
        &copy;{new Date().getFullYear()} MarkDev
      </h3>
    </footer>
  );
};

export default Footer;
