import React from 'react';

const CATEGORY_STYLES = {
  'การศึกษา': 'bg-purple-50 text-purple-700 border-purple-200',
  'เทคโนโลยี': 'bg-blue-50 text-blue-700 border-blue-200',
  'สังคม': 'bg-emerald-50 text-emerald-700 border-emerald-200'
};

export default function NewsTable({ newsList, loading, onEdit, onDelete, onViewDetail }) {
  if (loading) {
    return (
      <div className="bg-white p-16 text-center rounded-xl shadow-sm border border-slate-200">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-3"></div>
        <p className="text-slate-500 font-medium text-sm">กำลังโหลดข้อมูลข่าวสาร...</p>
      </div>
    );
  }

  if (!newsList || newsList.length === 0) {
    return (
      <div className="bg-white p-16 text-center rounded-xl shadow-sm border border-slate-200">
        <div className="text-4xl mb-3">📭</div>
        <h3 className="text-base font-bold text-slate-700 mb-1">ไม่พบข้อมูลข่าวสาร</h3>
        <p className="text-slate-400 text-sm">ยังไม่มีรายการข่าว หรือไม่มีข้อมูลที่ตรงกับเงื่อนไขการค้นหา</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
              <th className="py-3.5 px-4 w-16">#</th>
              <th className="py-3.5 px-4">หัวข้อข่าว</th>
              <th className="py-3.5 px-4">ผู้สื่อข่าว</th>
              <th className="py-3.5 px-4">หมวดหมู่</th>
              <th className="py-3.5 px-4">วันที่เผยแพร่</th>
              <th className="py-3.5 px-4">สถานะ</th>
              <th className="py-3.5 px-4 text-center w-48">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {newsList.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                  {item.id}
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs truncate">
                  {item.title}
                </td>
                <td className="py-3.5 px-4 text-slate-600">
                  {item.reporter}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${CATEGORY_STYLES[item.category] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    {item.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                  {item.publishedDate}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {item.status ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      เผยแพร่
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      ฉบับร่าง
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1.5">
                    {/* ปุ่มดูรายละเอียด */}
                    <button
                      type="button"
                      onClick={() => onViewDetail(item)}
                      className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition"
                      title="ดูรายละเอียด"
                    >
                      รายละเอียด
                    </button>
                    {/* ปุ่มแก้ไข */}
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="px-2.5 py-1 text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-md font-medium transition border border-amber-200"
                      title="แก้ไข"
                    >
                      แก้ไข
                    </button>
                    {/* ปุ่มลบ */}
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="px-2.5 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-md font-medium transition border border-red-200"
                      title="ลบ"
                    >
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center px-4">
        <span>จำนวนข่าวทั้งหมด: <strong>{newsList.length}</strong> รายการ</span>
      </div>
    </div>
  );
}
