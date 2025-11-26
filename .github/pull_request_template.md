## Description

<!-- Provide a brief description of your changes -->

## Type of Change

<!-- Mark the relevant option with an 'x' -->

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] New worker/service (adds a new Cloudflare Worker or service)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement
- [ ] CI/CD changes

## New Service Checklist

<!-- If you're adding a new worker or service, complete this section -->
<!-- Otherwise, you can delete this section -->

- [ ] Service added to `interfaces/admin-panel/src/config/services.js`
- [ ] Service name, description, and icon are clear and appropriate
- [ ] All API endpoints are documented in the services config
- [ ] Testing GUI link is included (if applicable)
- [ ] Usage instructions are complete and accurate
- [ ] Code example is tested and working
- [ ] Verified service appears correctly in Admin Panel → Services page
- [ ] All links are functional
- [ ] Service README.md created in the worker directory
- [ ] Deployment instructions included

## Testing Checklist

- [ ] Tests pass locally (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] Tested in local development environment
- [ ] Tested with mock API (if applicable)
- [ ] Tested with real API endpoints (if applicable)
- [ ] No console errors or warnings

## Documentation

- [ ] Updated relevant README files
- [ ] Added/updated API documentation
- [ ] Added/updated usage examples
- [ ] Updated CHANGELOG.md (if applicable)

## Deployment Considerations

<!-- Answer these questions if deploying to production -->

- [ ] Environment variables/secrets documented
- [ ] Database migrations included (if applicable)
- [ ] Wrangler configuration updated
- [ ] Rate limits configured appropriately
- [ ] Bindings (D1, R2, KV, Durable Objects) configured
- [ ] Deployment tested in staging environment

## Screenshots/Videos

<!-- If applicable, add screenshots or videos demonstrating the changes -->

## Related Issues

<!-- Link to related issues using #issue-number -->

Closes #

## Additional Notes

<!-- Add any additional context, concerns, or questions here -->

---

## Reviewer Checklist

<!-- For reviewers - ensure these items are checked -->

- [ ] Code follows project style guidelines
- [ ] Changes are well-documented
- [ ] No obvious security vulnerabilities
- [ ] Error handling is appropriate
- [ ] Service is added to Admin Panel (if new worker)
- [ ] Tests are adequate and passing
- [ ] Ready for deployment
