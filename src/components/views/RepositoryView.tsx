import React from 'react';
import { Folder, FileText, Image, Download, MoreHorizontal, FileCode, HardDrive } from 'lucide-react';

const FileRow = ({ name, type, size, modified, author }: any) => {
    const Icon = type === 'folder' ? Folder : type === 'image' ? Image : type === 'code' ? FileCode : FileText;
    const color = type === 'folder' ? 'text-blue-500 fill-blue-100' : 'text-gray-500';

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group">
      <td className="py-3 px-6">
        <div className="flex items-center gap-3">
            <Icon size={18} className={color} />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{name}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-sm text-gray-500">{size}</td>
      <td className="py-3 px-6 text-sm text-gray-500">{modified}</td>
      <td className="py-3 px-6 text-sm text-gray-500">{author}</td>
      <td className="py-3 px-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex justify-end gap-2">
            <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500"><Download size={16} /></button>
            <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500"><MoreHorizontal size={16} /></button>
        </div>
      </td>
    </tr>
  );
};

export const RepositoryView = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50/50">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Repository</h1>
          <p className="text-gray-500">Centralized asset and script storage</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium shadow-sm">
                New Folder
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm">
                Upload File
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex items-center gap-2 text-sm text-gray-600">
             <HardDrive size={16} />
             <span>/</span>
             <span className="hover:text-blue-600 cursor-pointer font-medium">Root</span>
             <span>/</span>
             <span className="hover:text-blue-600 cursor-pointer font-medium">Projects</span>
             <span>/</span>
             <span className="text-gray-900 font-bold">Alpha</span>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/2">Name</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Modified</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
              <th className="py-3 px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            <FileRow name="Scripts" type="folder" size="-" modified="Today, 10:23 AM" author="admin" />
            <FileRow name="Assets" type="folder" size="-" modified="Yesterday" author="admin" />
            <FileRow name="config.json" type="code" size="2 KB" modified="Feb 10, 2026" author="jane_doe" />
            <FileRow name="schema_v2.pdf" type="file" size="1.4 MB" modified="Feb 08, 2026" author="jane_doe" />
            <FileRow name="banner_main.png" type="image" size="3.2 MB" modified="Feb 08, 2026" author="design_team" />
            <FileRow name="readme.md" type="file" size="500 B" modified="Jan 23, 2026" author="admin" />
          </tbody>
        </table>
      </div>
    </div>
  );
};
