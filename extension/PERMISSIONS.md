# Chrome Extension Permissions

## Current Permissions (manifest.json)

The extension requests broad permissions to work with any n8n instance:

```json
{
  "host_permissions": ["https://*/", "http://*/"],
  "content_scripts": [{ "matches": ["*://*/*"] }]
}
```

**Why?** Different users have n8n instances on different domains (self-hosted, cloud, localhost, etc.).

## Security Considerations

### ⚠️ Broad Permissions
- Extension can access all websites
- Suitable for personal development use
- Review code before installation

### 🔒 For Production Use

Use `manifest.secure.json` as a template and customize it:

1. **Specify exact n8n domains**:
```json
{
  "host_permissions": [
    "https://your-n8n-instance.com/*"
  ],
  "content_scripts": [
    { "matches": ["https://your-n8n-instance.com/*"] }
  ]
}
```

2. **Use optional permissions**:
```json
{
  "optional_host_permissions": ["https://*/"]
}
```
Then request permission only when needed via Chrome's API.

## Customizing Permissions

### For Single n8n Instance
Edit `manifest.json`:
```json
{
  "host_permissions": [
    "https://your-n8n.example.com/*"
  ],
  "content_scripts": [
    {
      "matches": ["https://your-n8n.example.com/*"],
      "js": ["content.js"]
    }
  ]
}
```

### For Multiple Known Instances
```json
{
  "host_permissions": [
    "https://n8n-prod.company.com/*",
    "https://n8n-dev.company.com/*",
    "https://localhost:5678/*"
  ],
  "content_scripts": [
    {
      "matches": [
        "https://n8n-prod.company.com/*",
        "https://n8n-dev.company.com/*",
        "https://localhost:5678/*"
      ],
      "js": ["content.js"]
    }
  ]
}
```

### For n8n Cloud Only
```json
{
  "host_permissions": [
    "https://*.n8n.cloud/*"
  ],
  "content_scripts": [
    {
      "matches": ["https://*.n8n.cloud/*"],
      "js": ["content.js"]
    }
  ]
}
```

## Rebuilding After Changes

After modifying `manifest.json`:

```bash
npm run build:extension
```

Then reload the extension in Chrome:
1. Go to `chrome://extensions/`
2. Click the reload icon on the extension card

## Best Practices

1. **Minimal Permissions**: Only request what you need
2. **HTTPS Only**: Remove `http://` permissions if possible
3. **Specific Domains**: Use exact domains when known
4. **Optional Permissions**: Request additional permissions at runtime
5. **Regular Audits**: Review permissions periodically

## Permission Explanations

| Permission | Why Needed | Risk Level |
|------------|------------|------------|
| `storage` | Save configuration (API keys, settings) | Low |
| `activeTab` | Read current tab's canvas state | Low |
| `scripting` | Inject code to manipulate canvas | Medium |
| `host_permissions` | Access n8n instances | High* |

*High when set to all hosts (`https://*/`), Low when limited to specific domains.

## Recommendations by Use Case

### Personal Development (Current)
- ✅ Use default broad permissions
- ✅ Install from source (not store)
- ✅ Review code before use

### Team/Organization
- ⚠️ Limit to company n8n domains
- ⚠️ Code review by security team
- ⚠️ Internal distribution only

### Public Distribution
- ❌ Don't use broad permissions
- ✅ Use optional permissions
- ✅ Request specific domains
- ✅ Full security audit
- ✅ Privacy policy required

## Related Security Docs

- [SECURITY.md](../SECURITY.md) - Overall security considerations
- [Chrome Extension Security](https://developer.chrome.com/docs/extensions/mv3/security/)
- [Permission Warnings](https://developer.chrome.com/docs/extensions/mv3/permission_warnings/)
