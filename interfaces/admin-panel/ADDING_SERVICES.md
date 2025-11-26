# Adding New Services to the Admin Dashboard

When you create a new worker or service, you **MUST** add it to the Admin Panel Services page so other developers can discover and use it.

## Quick Guide

1. **Edit the services configuration file**:
   ```
   interfaces/admin-panel/src/config/services.js
   ```

2. **Add your service object** to the `services` array:
   ```javascript
   {
     id: 'your-service-id',
     name: 'Your Service Name',
     description: 'Brief description of what your service does',
     status: 'active',  // or 'development', 'deprecated'
     icon: '🚀',  // Pick an emoji that represents your service
     endpoints: [
       {
         method: 'POST',
         path: '/your-endpoint',
         description: 'What this endpoint does'
       }
     ],
     links: [
       {
         name: 'Testing GUI',
         url: 'https://your-service-gui.pages.dev',
         description: 'Link to your testing interface'
       }
     ],
     usage: {
       title: 'Quick Start',
       steps: [
         'Step 1: How to get started',
         'Step 2: How to use it',
         'Step 3: etc.'
       ]
     },
     example: {
       title: 'Example Request',
       code: `curl -X POST https://your-service.workers.dev/endpoint \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"key": "value"}'`
     }
   }
   ```

3. **Validate your service configuration**:
   ```bash
   cd interfaces/admin-panel
   npm run validate-services
   ```
   This will check for missing fields, invalid URLs, and other common issues.

4. **Test it locally**:
   ```bash
   npm run dev
   ```
   Navigate to http://localhost:3000 → Services tab and verify your service appears correctly.

5. **Include in your PR checklist**:
   - [ ] Service added to `src/config/services.js`
   - [ ] Service appears in Admin Panel Services page
   - [ ] All links are working
   - [ ] Documentation is complete and accurate

## Full Example

Here's a complete example for a text generation worker:

```javascript
{
  id: 'text-gen',
  name: 'Text Generation Worker',
  description: 'AI-powered text generation using GPT-4, Claude, and other LLMs',
  status: 'active',
  icon: '✍️',
  endpoints: [
    {
      method: 'POST',
      path: '/generate',
      description: 'Generate text from a prompt'
    },
    {
      method: 'POST',
      path: '/chat',
      description: 'Chat completion endpoint'
    },
    {
      method: 'GET',
      path: '/models',
      description: 'List available models'
    },
    {
      method: 'GET',
      path: '/health',
      description: 'Health check'
    }
  ],
  links: [
    {
      name: 'Testing GUI',
      url: 'https://text-gen-gui.pages.dev',
      description: 'Interactive interface for testing text generation'
    },
    {
      name: 'API Documentation',
      url: '/docs/api/text-generation',
      description: 'Complete API reference'
    },
    {
      name: 'GitHub Repository',
      url: 'https://github.com/your-org/text-gen-worker',
      description: 'Source code and examples'
    }
  ],
  usage: {
    title: 'Quick Start',
    steps: [
      'Get your API key from the Users page in the Admin Panel',
      'Choose your preferred model (gpt-4, claude-3, etc.)',
      'Send a POST request to /generate with your prompt',
      'Receive generated text in the response',
      'Check usage metrics in the Monitoring Dashboard'
    ]
  },
  example: {
    title: 'Example Request',
    code: `curl -X POST https://text-gen.workers.dev/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Write a haiku about coding",
    "model": "gpt-4",
    "instance_id": "production",
    "options": {
      "max_tokens": 100,
      "temperature": 0.7
    }
  }'`
  }
}
```

## Field Descriptions

### Required Fields

- **id** (string): Unique identifier in kebab-case (e.g., `image-gen`, `text-to-speech`)
- **name** (string): Human-readable service name (e.g., `Image Generation Worker`)
- **description** (string): One-sentence description of what the service does
- **status** (string): One of `active`, `development`, `deprecated`
- **icon** (string): Emoji representing the service (pick from https://emojipedia.org)

### Optional Fields

- **endpoints** (array): List of API endpoints
  - **method** (string): HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.)
  - **path** (string): Endpoint path (e.g., `/generate`, `/health`)
  - **description** (string): What the endpoint does

- **links** (array): Related links
  - **name** (string): Display name for the link
  - **url** (string): Full URL or relative path
  - **description** (string): What the link provides

- **usage** (object): Usage instructions
  - **title** (string): Section title (e.g., `Quick Start`, `Getting Started`)
  - **steps** (array of strings): Numbered steps for using the service

- **example** (object): Code example
  - **title** (string): Example title (e.g., `Example Request`, `Sample Code`)
  - **code** (string): Code snippet (will be displayed in a code block with copy button)

## Service Status Values

- **active**: Service is deployed and ready for production use
- **development**: Service is under development, may have limited functionality
- **deprecated**: Service is being phased out, use alternatives

## Best Practices

1. **Keep descriptions concise**: One sentence that clearly explains the service purpose
2. **Choose descriptive icons**: Pick emojis that visually represent your service
3. **Document all public endpoints**: Include every endpoint developers might use
4. **Provide working examples**: Test your curl examples before adding them
5. **Link to testing interfaces**: If you build a GUI, link to it
6. **Add step-by-step instructions**: Make it easy for new developers to get started
7. **Keep it updated**: Update the service entry when you add new endpoints or features

## Validation

Before submitting your PR, verify:

- [ ] Service ID is unique (no duplicates)
- [ ] All URLs are accessible
- [ ] Code examples are copy-paste ready and work
- [ ] Service appears correctly in the Services page UI
- [ ] No console errors when viewing the Services page
- [ ] All links open in new tabs (external) or navigate correctly (internal)

## PR Checklist Template

Add this to your pull request description when adding a new worker:

```markdown
## New Service Checklist

- [ ] Service added to `interfaces/admin-panel/src/config/services.js`
- [ ] Service name, description, and icon are clear and appropriate
- [ ] All API endpoints are documented
- [ ] Testing GUI link is included (if applicable)
- [ ] Usage instructions are complete and accurate
- [ ] Code example is tested and working
- [ ] Verified service appears correctly in Admin Panel → Services
- [ ] All links are functional
```

## Questions?

If you're unsure about how to add your service:
1. Check existing services in `src/config/services.js` for examples
2. Review this guide
3. Ask in the team Slack channel
4. Tag @admin-panel-maintainer in your PR

## Automated Validation

Run the validation script to check your service configuration:

```bash
npm run validate-services
```

This script automatically:
- ✅ Verifies all service IDs are unique
- ✅ Checks for required fields (id, name, description, status, icon)
- ✅ Validates service status values
- ✅ Ensures endpoint methods are valid HTTP methods
- ✅ Checks URL formats
- ✅ Warns about missing descriptions or documentation

**Note**: The validation script runs automatically before every build (`npm run build`), so invalid configurations will prevent deployment.

---

**Remember**: The Services page is the first place developers look to discover what's available. Keep it up to date!
