# Visual Guide

## Web Application Screenshots

### Main Interface
![Main Interface](https://github.com/user-attachments/assets/0a391983-1d94-429a-943c-e5a6dd6704fc)

The main interface features:
- **Header**: Clear branding with gradient background
- **Configuration Toggle**: Collapsible panel for API settings
- **Prompt Input**: Large text area for natural language workflow descriptions
- **Generate Button**: Disabled until configuration is complete
- **Status Messages**: Helpful hints guide users through setup

### Configuration Panel
![Configuration Panel](https://github.com/user-attachments/assets/0ccb921a-e491-4eb5-9cdd-6f0df0ec1827)

The configuration panel includes:
- **n8n Configuration**: URL and API key inputs for your n8n instance
- **LLM Configuration**: Provider selection (OpenAI/Anthropic) and API key
- **Two-Column Layout**: Organized side-by-side for easy setup
- **Persistent Storage**: Settings saved to localStorage automatically

## Chrome Extension

The Chrome extension provides:
- **Popup Interface**: Quick access to common actions
- **Configuration Section**: n8n URL and API key setup
- **Canvas Reader**: Extract workflow state from n8n editor
- **Web App Launcher**: One-click access to full application

## User Flow

1. **Initial Setup**: User opens app and sees disabled interface with helpful message
2. **Configuration**: User clicks Configuration button and enters API credentials
3. **Workflow Generation**: After setup, user types natural language prompt
4. **Result Display**: Generated workflow shown with node visualization and JSON
5. **Management**: Activate/deactivate workflows, view details

## Design Features

### Modern Dark Theme
- Background: `#1a1a1a` (main) / `#2a2a2a` (cards)
- Accent: Purple gradient (`#667eea` to `#764ba2`)
- Text: White with various opacity levels
- Clean, professional aesthetic

### Responsive Layout
- Desktop: Side-by-side configuration columns
- Mobile: Stacked layout for smaller screens
- Flexible grid system adapts to content

### User Experience
- **Disabled States**: Clear visual feedback when configuration incomplete
- **Loading States**: Button text changes during processing
- **Error Messages**: Prominent red banners for issues
- **Success Indicators**: Green status for active workflows

## Key Interface Elements

### Buttons
- **Primary**: Gradient purple background for main actions
- **Secondary**: Dark gray for auxiliary actions
- **Hover Effects**: Subtle lift animation on interaction

### Input Fields
- Dark background with light borders
- Focus state: Purple border highlight
- Password masking for API keys
- Placeholder text for guidance

### Status Indicators
- Pulsing green dot for active workflows
- Gray dot for inactive workflows
- Color-coded messages (red=error, green=success)

## Extension Interface

The extension popup provides a compact interface with:
- Header with branding
- Status indicator showing connection state
- Quick action buttons
- Collapsible configuration section
- Minimal, focused design for browser toolbar

## Accessibility

- High contrast text and backgrounds
- Clear focus indicators
- Descriptive labels and placeholders
- Keyboard navigation support
- Screen reader compatible structure

## Performance

- Fast initial load (<2 seconds)
- Responsive interactions
- Lazy loading for heavy components
- Efficient state management
- Minimal re-renders

## Future Enhancements

Potential visual improvements:
- Workflow canvas visualization with drag-and-drop
- Node connection previews
- Dark/light theme toggle
- Custom color schemes
- Animation effects for workflow generation
- Real-time collaboration indicators
- Workflow history timeline
