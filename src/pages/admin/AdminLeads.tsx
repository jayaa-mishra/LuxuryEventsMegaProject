import React, { useState, Fragment } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { WorkflowTimeline } from '@/components/workflow/WorkflowTimeline';

export default function AdminLeads() {
  const { leads, fetching, updateStatus } = useLeads();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'all' || lead.status === filter;
    const matchesSearch = lead.client_name.toLowerCase().includes(search.toLowerCase()) || 
                          lead.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (fetching) return <Loader />;

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-garamond text-plum">Lead Management</h1>
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-plum/60 mt-2">Manage inbound inquiries</p>
        </div>
      </div>

      <div className="bg-white p-6 mb-8 flex flex-col md:flex-row gap-4 border border-rose/20">
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          className="flex-1 bg-blush border border-rose/30 px-4 py-3 font-sans text-sm focus:outline-none focus:border-rose text-plum"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="bg-blush border border-rose/30 px-4 py-3 font-sans text-xs tracking-[0.1em] uppercase focus:outline-none focus:border-rose text-plum"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredLeads.length === 0 ? (
        <EmptyState message="No leads found matching your criteria." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-rose/20">
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Date</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Client</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Details</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <Fragment key={lead._id}>
                <tr className="border-b border-rose/10 hover:bg-white/50 transition-colors cursor-pointer" onClick={() => setExpandedLead(expandedLead === lead._id ? null : lead._id)}>
                  <td className="py-4 px-4 font-sans text-sm text-plum">
                    {new Date(lead.createdAt || '').toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-sans font-medium text-plum">{lead.client_name}</p>
                    <p className="font-sans text-xs text-plum/60">{lead.email}</p>
                    <p className="font-sans text-xs text-plum/60">{lead.phone}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-sans text-sm text-plum">{new Date(lead.event_date).toLocaleDateString()} &mdash; {lead.guest_count} Guests</p>
                    <p className="font-sans text-xs text-plum/60 mt-1">Budget: {lead.budget}</p>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      className={`font-sans text-[10px] tracking-[0.1em] uppercase px-3 py-2 border border-rose/30 bg-transparent focus:outline-none focus:border-plum ${
                        lead.status === 'new' ? 'text-rose font-bold' : 
                        lead.status === 'converted' ? 'text-olive font-bold' : 'text-plum'
                      }`}
                      value={lead.status}
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
                {expandedLead === lead._id && (
                  <tr className="border-b border-rose/10 bg-rose/5">
                    <td colSpan={4} className="p-0">
                      <div className="p-6">
                        <WorkflowTimeline entityId={lead._id} />
                      </div>
                    </td>
                  </tr>
                )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
