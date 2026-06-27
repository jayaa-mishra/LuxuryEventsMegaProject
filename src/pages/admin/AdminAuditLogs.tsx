import { useAudit } from '@/hooks/useAudit';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { useState } from 'react';

export default function AdminAuditLogs() {
  const { logs, fetching, pages, fetchLogs } = useAudit();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('All');

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFilter(val);
    setPage(1);
    fetchLogs(1, 50, val === 'All' ? undefined : val);
  };

  if (fetching && logs.length === 0) return <Loader />;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-garamond text-4xl text-plum">Audit Logs</h1>
        <select 
          value={filter} 
          onChange={handleFilter}
          className="p-2 border border-rose/30 bg-transparent text-plum font-sans text-sm outline-none"
        >
          <option value="All">All Entities</option>
          <option value="Lead">Lead</option>
          <option value="Quotation">Quotation</option>
          <option value="Booking">Booking</option>
          <option value="Payment">Payment</option>
          <option value="Workflow">Workflow</option>
        </select>
      </div>
      
      {logs.length === 0 ? (
        <EmptyState message="No audit logs found." />
      ) : (
        <div className="bg-white border border-rose/20 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-rose/5">
              <tr className="border-b border-rose/20">
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Timestamp</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">User</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Action</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Entity</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-b border-rose/10 hover:bg-rose/5">
                  <td className="py-4 px-4 font-sans text-xs text-plum/80">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="py-4 px-4 font-sans text-xs text-plum">{log.performedBy?.name || 'System'}</td>
                  <td className="py-4 px-4 font-sans text-[10px] uppercase tracking-widest text-plum font-bold">{log.action.replace(/_/g, ' ')}</td>
                  <td className="py-4 px-4 font-sans text-xs text-plum">{log.entityType} ({log.entityId.substring(0,8)})</td>
                  <td className="py-4 px-4 font-sans text-xs text-plum/60 max-w-xs truncate" title={JSON.stringify(log.newValue)}>
                    {log.oldValue ? `${JSON.stringify(log.oldValue)} → ` : ''}{JSON.stringify(log.newValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {pages > 1 && (
        <div className="flex gap-4 mt-6 justify-end">
          <button 
            disabled={page === 1} 
            onClick={() => { setPage(p => p - 1); fetchLogs(page - 1, 50, filter === 'All' ? undefined : filter); }}
            className="text-xs uppercase tracking-widest text-plum hover:text-rose disabled:opacity-50"
          >Prev</button>
          <span className="text-xs text-plum">{page} / {pages}</span>
          <button 
            disabled={page === pages} 
            onClick={() => { setPage(p => p + 1); fetchLogs(page + 1, 50, filter === 'All' ? undefined : filter); }}
            className="text-xs uppercase tracking-widest text-plum hover:text-rose disabled:opacity-50"
          >Next</button>
        </div>
      )}
    </div>
  );
}
