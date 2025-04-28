# CoCursor - Real-time Cursor Tracking Library

CoCursor is a service that supports real-time cursor tracking for React projects. Move the cursor from the Figma canvas to your webpage and track it in real time.

## Installation

```
npm install cocursor
```

## Get Started

To use CoCursor, you need to obtain an API Key. You can get the API key from CoCursor.

```tsx
import CoCursorProvider from 'cocursor';

export default function PageComponent() {
  return (
    <CoCursorProvider apiKey={process.env.REACT_APP_COCURSOR_API_KEY as string}>
      {/* ... */}
    </CoCursorProvider>
  );
}
```

## For More Information

- [`CoCursorProvider` Props](https://cocursor.vercel.app/docs/CoCursorProvider)
- [The Hook to control CoCursor](https://cocursor.vercel.app/docs/useCoCursor)
- [Custom Style](https://cocursor.vercel.app/docs/custom-style)

## CoCursor is Open Source!

- Module: https://github.com/alexgoni/cocursor
- Server: https://github.com/alexgoni/cocursor-server
- Docs:https://github.com/alexgoni/cocursor-service

We’re always open to contributions! Feel free to contribute.
