import React from 'react';
import { useWorkflow } from '@/hooks/useWorkflow';
import { Loader } from '@/components/common/Loader';

interface Props {
  entityId: string;
}

export function WorkflowTimeline({ entityId }: Props) {
  const { workflow, loading } = useWorkflow(entityId);

  if (loading) return <Loader />;
  if (!workflow) return <div className="text-sm text-plum/50">No workflow found for this entity.</div>;

  return (
    <div className="bg-white p-6 border border-rose/20">
      <h3 className="font-sans text-xs uppercase tracking-widest text-plum mb-6 font-bold">Workflow Status: {workflow.currentState.replace(/_/g, ' ')}</h3>
      <div className="relative border-l border-rose/30 ml-3 space-y-6">
        {workflow.history.map((item: any, i: number) => (
          <div key={i} className="pl-6 relative">
            <div className="absolute w-3 h-3 bg-rose rounded-full -left-1.5 top-1"></div>
            <div className="font-sans text-[10px] tracking-widest text-plum/50 uppercase mb-1">
              {new Date(item.timestamp).toLocaleString()}
            </div>
            <div className="font-sans text-sm text-plum font-bold">
              {item.fromState ? `${item.fromState.replace(/_/g, ' ')} → ` : ''}{item.toState.replace(/_/g, ' ')}
            </div>
            {item.notes && <div className="text-sm text-plum/70 mt-1">{item.notes}</div>}
            {item.performedBy && <div className="text-xs text-plum/40 mt-1">By: {item.performedBy.name || item.performedBy}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
