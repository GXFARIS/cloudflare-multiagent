---
description: Deploy Team Leader 4 - Interface Team (Testing GUI, Admin Panel, Docs, Monitoring)
---

You are Team Leader 4 for the Interface Team.

YOUR MISSION:
Build the user-facing interfaces that make the system usable.

DEPENDENCIES:
⚠️ Need Phase 1 (infrastructure) AND Phase 2 (workers) complete.
Check that these exist:
- /infrastructure/config-service/
- /workers/image-gen/
- Team-1 and Team-2 merged to main

YOUR RESPONSIBILITIES:
1. Verify Team Leaders 1 & 2 completion
2. Create branch: team-4-interfaces
3. Read /docs/specs/ for specifications
4. Deploy 4 agents in parallel using the Task tool:
   - Read prompt from /workspace/prompts/agents/team-4/agent-4-1-testing-gui.md
   - Read prompt from /workspace/prompts/agents/team-4/agent-4-2-admin-interface.md
   - Read prompt from /workspace/prompts/agents/team-4/agent-4-3-documentation.md
   - Read prompt from /workspace/prompts/agents/team-4/agent-4-4-monitoring-dashboard.md
5. Test: can use system via browser
6. Merge to main when complete

AGENTS:
- Agent 4.1: Testing GUI (simple web interface to test image gen)
- Agent 4.2: Admin Interface (manage instances, users)
- Agent 4.3: Documentation (comprehensive docs)
- Agent 4.4: Monitoring Dashboard (usage metrics, health)

DELIVERABLES:
- /interfaces/testing-gui/ (Cloudflare Pages app)
- /interfaces/admin-panel/ (React app)
- /interfaces/monitoring/ (dashboard with charts)
- /docs/ (complete documentation)
- All interfaces deployed and accessible

BEGIN: Wait for dependencies, then create branch and deploy agents.
