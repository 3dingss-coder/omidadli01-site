// src/utils/clipboard.ts
//
// navigator.clipboard is undefined on plain-HTTP origins and on older
// browsers, so calling it directly throws `TypeError: Cannot read
// properties of undefined (reading 'writeText')`. This wrapper never
// throws: it resolves `true` on success and `false` otherwise, falling
// back to the legacy execCommand('copy') technique when the modern API
// isn't available or fails.

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied / not focused / not secure context — fall through
      // to the legacy technique instead of failing outright.
    }
  }

  if (typeof document === 'undefined') return false;

  const previousActiveElement = document.activeElement as HTMLElement | null;
  const previousSelection =
    typeof window !== 'undefined' && window.getSelection && window.getSelection()!.rangeCount > 0
      ? window.getSelection()!.getRangeAt(0)
      : null;

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  // Keep it out of the visible layout / accessibility tree, but still
  // selectable by execCommand('copy'), which requires it to be attached
  // and not display:none.
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '1px';
  textarea.style.height = '1px';
  textarea.style.padding = '0';
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.boxShadow = 'none';
  textarea.style.background = 'transparent';
  textarea.style.opacity = '0';

  let succeeded = false;
  try {
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    succeeded = typeof document.execCommand === 'function' && document.execCommand('copy');
  } catch {
    succeeded = false;
  } finally {
    textarea.remove();
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
    if (previousSelection && window.getSelection) {
      const sel = window.getSelection()!;
      sel.removeAllRanges();
      sel.addRange(previousSelection);
    }
  }

  return succeeded;
}
