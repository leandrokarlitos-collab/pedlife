import React, { useState } from 'react';
import { Activity, ChevronDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProtocolDataItem {
  condition: string;
  conduct: string;
}

interface ProtocolTableProps {
  data: ProtocolDataItem[];
}

const ProtocolTable: React.FC<ProtocolTableProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-2xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border border-white/50 dark:border-white/10 ring-1 ring-inset ring-white/20 dark:ring-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(99,102,241,0.08)] overflow-hidden">
      {/* Header - Clicável */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-300 border-b border-white/30 dark:border-white/10"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-white/10 shadow-sm">
            <Activity className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Protocolo de Controle de Glicemia
          </h3>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Table - Condicional */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200/50 dark:border-slate-700/30">
              <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-sm uppercase tracking-wide py-4">
                Glicemia
              </TableHead>
              <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-sm uppercase tracking-wide py-4">
                Conduta
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                className={`
                  transition-colors duration-200
                  ${index % 2 === 0
                    ? "bg-white/30 dark:bg-slate-800/20"
                    : "bg-slate-50/50 dark:bg-slate-700/20"
                  }
                  hover:bg-slate-100/50 dark:hover:bg-slate-700/30
                  border-b border-slate-200/30 dark:border-slate-700/30
                `}
              >
                <TableCell className="font-medium text-slate-700 dark:text-slate-200 py-3.5">
                  {item.condition}
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-300 py-3.5">
                  {item.conduct}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProtocolTable;
