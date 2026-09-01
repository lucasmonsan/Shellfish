# Catalog Manual Validation Checklist

Run this checklist after automated quality gates and before accepting a catalog
change.

## Keyboard and focus

- Tab through every interactive control in Chromium, Firefox and WebKit.
- Confirm visible focus, logical order, Enter/Space behavior and Escape close
  behavior for menus and dialogs.
- Confirm focus returns to the invoking control after closing an overlay.

## Screen reader and content

- Verify labels, descriptions, current state and feedback with a screen reader.
- Confirm Portuguese and English copy, including aria labels, are accurate.
- Confirm copied code remains English and matches the visible playground state.

## Visual behavior

- Inspect desktop and mobile widths in both themes.
- Confirm menus, popovers, shadows and dialogs are never clipped while open.
- Confirm reduced-motion preference removes non-essential movement.
