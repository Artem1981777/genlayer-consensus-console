import { describe, it, expect } from "vitest"
import { PROJECTS, getProject } from "./projects"

const CM = "0x235f51b11b9f96d6673df37553ef58373c4324f9"
const MOD = "0x2d8257E5C7343f40F7Da5380E0d26b599a6036DE"
const PM_V2 = "0x2dc09cDbb8319303eAc78E85D5d055BB53bdA6BE"
const PM_LIFECYCLE = "0x390CAd661cEf8e2bBAc9b6a1B8A152d9083F8ba0"
const ADDR = /^0x[0-9a-fA-F]{40}$/

describe("projects config", () => {
  it("has moderator and prediction", () => {
    expect(getProject("moderator").id).toBe("moderator")
    expect(getProject("prediction").id).toBe("prediction")
  })
  it("defaults to latest contracts (seedContracts[0])", () => {
    expect(getProject("moderator").seedContracts[0]).toBe(MOD)
    expect(getProject("moderator").seedContracts).toContain(CM)
    expect(getProject("prediction").seedContracts[0]).toBe(PM_V2)
    expect(getProject("prediction").seedContracts).toContain(PM_LIFECYCLE)
  })
  it("drops the stale prediction addresses (v1 superseded by v2)", () => {
    const all = PROJECTS.flatMap((p) => p.seedContracts)
    expect(all).not.toContain("0x3d17bD6d87563cB172E7C634341fBc8A14574035")
    expect(all).not.toContain("0xd2Ead3C6BbaCe1D423F156762f33A2C9B406C73f")
    expect(all).not.toContain("0x72f6BE503a8319A40515641536C1d74378623914")
  })
  it("all seed contracts are valid addresses", () => {
    for (const p of PROJECTS) for (const a of p.seedContracts) expect(a).toMatch(ADDR)
  })
  it("every project has repo, demo, and at least one contract", () => {
    for (const p of PROJECTS) {
      expect(p.repo).toMatch(/^https:\/\/github\.com\//)
      expect(p.demo).toMatch(/^https:\/\//)
      expect(p.seedContracts.length).toBeGreaterThan(0)
    }
  })
  it("falls back to the first project for unknown id", () => {
    expect(getProject("nope").id).toBe(PROJECTS[0].id)
  })
})
