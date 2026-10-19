import React from 'react';

const CATEGORY_STYLES = {
  'การศึกษา': 'bg-purple-50 text-purple-700 border-purple-200',
  'เทคโนโลยี': 'bg-blue-50 text-blue-700 border-blue-200',
  'สังคม': 'bg-emerald-50 text-emerald-700 border-emerald-200'
};

export default function NewsDetailModal({ news, onClose }) {
  if (!news) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50">
          <div>
            <span className="text-xs font-mono text-slate-400">ข่าวรหัส #{news.id}</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
              {news.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/50 transition"
          >
            ✕
          </button>
        </div>

        {/* Badges / Meta Info */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 flex flex-wrap gap-2 text-xs">
          <span className={`px-2.5 py-1 rounded-full border font-medium ${CATEGORY_STYLES[news.category] || 'bg-slate-100 text-slate-700'}`}>
            หมวดหมู่: {news.category}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
            ผู้สื่อข่าว: {news.reporter}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
            วันที่เผยแพร่: {news.publishedDate}
          </span>
          <span className={`px-2.5 py-1 rounded-full border font-medium ${news.status ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
            สถานะ: {news.status ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}
          </span>
        </div>

        {/* เนื้อหาข่าว */}
        <div className="p-6 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
          {news.description ? (
            <p className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700">{news.description}</p>
          ) : (
            <p className="text-slate-400 italic">ไม่มีรายละเอียดเนื้อหาข่าวเพิ่มเติม</p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium text-sm rounded-lg transition"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
