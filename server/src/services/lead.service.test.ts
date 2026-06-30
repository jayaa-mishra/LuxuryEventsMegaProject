import { describe, it, expect, vi, beforeEach } from 'vitest';

// Stub the cross-cutting collaborators so no DB / queue is loaded.
vi.mock('./workflow.service', () => ({
  workflowService: {
    initializeWorkflow: vi.fn(),
    getWorkflowByLeadOrBooking: vi.fn(),
    advanceWorkflow: vi.fn(),
  },
}));
vi.mock('./audit.service', () => ({ auditService: { logAction: vi.fn() } }));
vi.mock('./notification.service', () => ({ notificationService: { sendNotification: vi.fn() } }));

import { LeadService } from './lead.service';
import { workflowService } from './workflow.service';
import { auditService } from './audit.service';
import { notificationService } from './notification.service';

const lead = (over: Record<string, any> = {}) => ({
  _id: { toString: () => 'L1' },
  email: 'a@b.com',
  client_name: 'Alice',
  status: 'new',
  ...over,
});

const makeRepo = () =>
  ({
    create: vi.fn(),
    getAllWithPackage: vi.fn(),
    getByIdWithPackage: vi.fn(),
    updateStatus: vi.fn(),
    get: vi.fn(),
  }) as any;

describe('LeadService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('createLead persists, initialises a workflow, and writes an audit log', async () => {
    const repo = makeRepo();
    repo.create.mockResolvedValue(lead());
    const svc = new LeadService(repo);

    const created = await svc.createLead({ client_name: 'Alice' } as any, 'user-1');

    expect(repo.create).toHaveBeenCalledOnce();
    expect(workflowService.initializeWorkflow).toHaveBeenCalledWith('L1', 'user-1');
    expect(auditService.logAction).toHaveBeenCalledOnce();
    expect(created).toBeTruthy();
  });

  it('marking a lead qualified advances the workflow and notifies', async () => {
    const repo = makeRepo();
    repo.get.mockResolvedValue(lead({ status: 'new' }));
    repo.updateStatus.mockResolvedValue(lead({ status: 'qualified' }));
    (workflowService.getWorkflowByLeadOrBooking as any).mockResolvedValue({
      _id: { toString: () => 'W1' },
    });
    const svc = new LeadService(repo);

    await svc.updateLeadStatus('L1', 'qualified', 'user-1');

    expect(workflowService.advanceWorkflow).toHaveBeenCalledOnce();
    expect(notificationService.sendNotification).toHaveBeenCalledOnce();
  });

  it('does not run side effects when the lead is missing', async () => {
    const repo = makeRepo();
    repo.get.mockResolvedValue(null);
    repo.updateStatus.mockResolvedValue(null);
    const svc = new LeadService(repo);

    const result = await svc.updateLeadStatus('missing', 'qualified', 'user-1');

    expect(result).toBeNull();
    expect(workflowService.advanceWorkflow).not.toHaveBeenCalled();
    expect(notificationService.sendNotification).not.toHaveBeenCalled();
  });
});
