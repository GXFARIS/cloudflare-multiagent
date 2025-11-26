#!/usr/bin/env node

/**
 * Service Configuration Validator
 *
 * This script validates the services configuration to ensure:
 * - All required fields are present
 * - Service IDs are unique
 * - URLs are properly formatted
 * - No duplicate services
 *
 * Run: node scripts/validate-services.js
 */

import { services } from '../src/config/services.js'

const REQUIRED_FIELDS = ['id', 'name', 'description', 'status', 'icon']
const VALID_STATUSES = ['active', 'development', 'deprecated']
const VALID_HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']

let errors = []
let warnings = []
let serviceIds = new Set()

console.log('🔍 Validating services configuration...\n')

// Validate each service
services.forEach((service, index) => {
  const serviceName = service.name || `Service at index ${index}`

  // Check required fields
  REQUIRED_FIELDS.forEach(field => {
    if (!service[field]) {
      errors.push(`❌ ${serviceName}: Missing required field '${field}'`)
    }
  })

  // Check for duplicate IDs
  if (service.id) {
    if (serviceIds.has(service.id)) {
      errors.push(`❌ Duplicate service ID: '${service.id}'`)
    }
    serviceIds.add(service.id)
  }

  // Validate status
  if (service.status && !VALID_STATUSES.includes(service.status)) {
    errors.push(`❌ ${serviceName}: Invalid status '${service.status}'. Must be one of: ${VALID_STATUSES.join(', ')}`)
  }

  // Validate endpoints
  if (service.endpoints) {
    if (!Array.isArray(service.endpoints)) {
      errors.push(`❌ ${serviceName}: 'endpoints' must be an array`)
    } else {
      service.endpoints.forEach((endpoint, epIndex) => {
        if (!endpoint.method) {
          errors.push(`❌ ${serviceName}: Endpoint ${epIndex} missing 'method'`)
        } else if (!VALID_HTTP_METHODS.includes(endpoint.method.toUpperCase())) {
          warnings.push(`⚠️  ${serviceName}: Endpoint ${epIndex} has unusual method '${endpoint.method}'`)
        }

        if (!endpoint.path) {
          errors.push(`❌ ${serviceName}: Endpoint ${epIndex} missing 'path'`)
        }

        if (!endpoint.description) {
          warnings.push(`⚠️  ${serviceName}: Endpoint ${epIndex} missing description`)
        }
      })
    }
  }

  // Validate links
  if (service.links) {
    if (!Array.isArray(service.links)) {
      errors.push(`❌ ${serviceName}: 'links' must be an array`)
    } else {
      service.links.forEach((link, linkIndex) => {
        if (!link.name) {
          errors.push(`❌ ${serviceName}: Link ${linkIndex} missing 'name'`)
        }

        if (!link.url) {
          errors.push(`❌ ${serviceName}: Link ${linkIndex} missing 'url'`)
        } else {
          // Basic URL validation
          const urlPattern = /^(https?:\/\/|\/)/
          if (!urlPattern.test(link.url)) {
            warnings.push(`⚠️  ${serviceName}: Link '${link.name}' has invalid URL format: ${link.url}`)
          }
        }

        if (!link.description) {
          warnings.push(`⚠️  ${serviceName}: Link '${link.name}' missing description`)
        }
      })
    }
  }

  // Validate usage section
  if (service.usage) {
    if (!service.usage.title) {
      warnings.push(`⚠️  ${serviceName}: Usage section missing title`)
    }

    if (!service.usage.steps || !Array.isArray(service.usage.steps)) {
      errors.push(`❌ ${serviceName}: Usage section missing 'steps' array`)
    } else if (service.usage.steps.length === 0) {
      warnings.push(`⚠️  ${serviceName}: Usage steps array is empty`)
    }
  }

  // Validate example section
  if (service.example) {
    if (!service.example.title) {
      warnings.push(`⚠️  ${serviceName}: Example section missing title`)
    }

    if (!service.example.code) {
      errors.push(`❌ ${serviceName}: Example section missing 'code'`)
    }
  }

  // Check if service has at least endpoints or links
  if (!service.endpoints && !service.links && !service.usage) {
    warnings.push(`⚠️  ${serviceName}: Service has no endpoints, links, or usage instructions. Consider adding at least one.`)
  }
})

// Print results
console.log(`📊 Validation Results:\n`)
console.log(`  Total services: ${services.length}`)
console.log(`  Errors: ${errors.length}`)
console.log(`  Warnings: ${warnings.length}\n`)

if (errors.length > 0) {
  console.log('❌ ERRORS:\n')
  errors.forEach(error => console.log(`  ${error}`))
  console.log('')
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:\n')
  warnings.forEach(warning => console.log(`  ${warning}`))
  console.log('')
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All services are properly configured!\n')
  process.exit(0)
} else if (errors.length > 0) {
  console.log('❌ Validation failed. Please fix the errors above.\n')
  process.exit(1)
} else {
  console.log('⚠️  Validation passed with warnings. Consider addressing them.\n')
  process.exit(0)
}
