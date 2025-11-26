# Custom Claude Code Commands

## Team Leader Deployment Commands

Use these commands to deploy Team Leaders for autonomous multi-agent development:

### `/team-lead-1` - Infrastructure Team
**Status**: Ready to deploy
**Dependencies**: None (Phase 1 - starts first)
**Agents**: 4 (Database, Config Service, Auth, Lookup)
**Deliverables**: Core infrastructure with D1, Config Service, Auth

### `/team-lead-2` - Worker Implementation Team
**Status**: Waiting for Team Lead 1
**Dependencies**: Team Lead 1 must complete
**Agents**: 4 (Provider Adapters, Rate Limiter, R2 Storage, Image Gen)
**Deliverables**: Functional Image Generation Worker

### `/team-lead-3` - Operations Team
**Status**: Waiting for Team Lead 1
**Dependencies**: Team Lead 1 must complete (can run parallel with Team Lead 2)
**Agents**: 4 (Error Handling, Logging, Deployment Scripts, GitHub Actions)
**Deliverables**: Deployment automation and monitoring

### `/team-lead-4` - Interface Team
**Status**: Waiting for Team Leads 1 & 2
**Dependencies**: Team Leads 1 AND 2 must complete
**Agents**: 4 (Testing GUI, Admin Panel, Documentation, Monitoring Dashboard)
**Deliverables**: User-facing interfaces and complete documentation

## Usage

Simply type the command in Claude Code:
```
/team-lead-1
```

Claude Code will load the full prompt and begin working as that Team Leader.

## Deployment Order

1. **First**: Deploy `/team-lead-1` and wait for completion
2. **Second**: Deploy `/team-lead-2` and `/team-lead-3` in parallel
3. **Third**: Deploy `/team-lead-4` after Team Leads 1 & 2 complete

## Monitoring Progress

Watch git commits to track agent progress:
```bash
# Watch all branches
git log --all --oneline --graph

# Count completed agents
git log --all --grep="\[AGENT.*complete" | wc -l

# Check for escalations
git log --all --grep="ESCALATION"
```

## Alternative: Manual Command

You can also say: "Team Lead # you are cleared for takeoff" and I'll execute the corresponding `/team-lead-#` command.
