// Lightweight HTML sanitizer — keeps a safe subset of tags/attributes.
// Avoids third-party libs; intended for client-side use.
export default function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";

  // If running outside browser (SSR), return escaped text
  if (typeof document === "undefined") {
    return String(dirty).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  const allowedTags = new Set([
    "a","b","i","strong","em","u","p","br","ul","ol","li",
    "img","h1","h2","h3","h4","h5","h6","blockquote","code","pre",
    "span","div","table","thead","tbody","tr","th","td"
  ]);

  const allowedAttributes: { [k: string]: string[] } = {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
    '*': ["title"]
  };

  function isSafeUrl(url: string | null): boolean {
    if (!url) return false;
    const s = url.trim().toLowerCase();
    if (s === "") return false;
    if (s.startsWith("javascript:") || s.startsWith("vbscript:")) return false;
    if (s.startsWith("data:")) {
      // only allow data images
      return /^data:image\/(png|jpeg|gif|webp);/i.test(s);
    }
    return true; // allow http(s), mailto:, tel:, relative paths, hashes
  }

  const container = document.createElement("div");
  container.innerHTML = dirty;

  function walk(node: Node) {
    const children = Array.from(node.childNodes);
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement;
        const tag = el.tagName.toLowerCase();

        if (!allowedTags.has(tag)) {
          // unwrap: move children up and remove the element
          while (el.firstChild) el.parentNode!.insertBefore(el.firstChild, el);
          el.parentNode!.removeChild(el);
          continue;
        }

        // filter attributes
        const attrs = Array.from(el.attributes);
        const allowedForTag = new Set([...(allowedAttributes[tag] || []), ...(allowedAttributes['*'] || [])]);
        for (const attr of attrs) {
          const name = attr.name.toLowerCase();
          if (name.startsWith("on")) {
            el.removeAttribute(attr.name);
            continue;
          }
          if (!allowedForTag.has(name)) {
            el.removeAttribute(attr.name);
            continue;
          }
          if ((name === "href" || name === "src") && !isSafeUrl(attr.value)) {
            el.removeAttribute(attr.name);
            continue;
          }
        }

        // ensure safe rel for target=_blank
        if (tag === "a") {
          if (el.getAttribute("target") === "_blank") {
            el.setAttribute("rel", "noopener noreferrer");
          }
        }

        // recurse
        walk(el);
      } else if (child.nodeType === Node.COMMENT_NODE) {
        // remove comments
        child.parentNode!.removeChild(child);
      } else if (child.nodeType === Node.TEXT_NODE) {
        // keep text nodes as-is
      } else {
        // remove other node types
        child.parentNode!.removeChild(child);
      }
    }
  }

  walk(container);
  return container.innerHTML;
}
