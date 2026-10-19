import React from 'react';

const CATEGORY_STYLES = {
  'การศึกษา': 'bg-purple-50 text-purple-700 border-purple-200',
  'เทคโนโลยี': 'bg-[#C0E4F6]/70 text-tropical-950 border-tropical-300 font-semibold',
  'สังคม': 'bg-emerald-50 text-emerald-700 border-emerald-200'
};

export default function NewsDetailModal({ news, onClose }) {
  if (!news) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden border border-tropical-200">
        {/* Header */}
        <div className="p-6 border-b border-tropical-200 flex items-start justify-between bg-tropical-100/60">
          <div>
            <span className="text-xs font-mono text-tropical-600 font-semibold">ข่าวรหัส #{news.id}</span>
            <h3 className="text-lg font-bold text-tropical-950 mt-1 leading-snug">
              {news.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-tropical-600 hover:text-tropical-900 p-1.5 rounded-lg hover:bg-tropical-200/50 transition font-bold"
          >
            ✕
          </button>
        </div>

        {/* Badges / Meta Info */}
        <div className="px-6 py-3 bg-white border-b border-tropical-100 flex flex-wrap gap-2 text-xs">
          <span className={`px-2.5 py-1 rounded-full border font-medium ${CATEGORY_STYLES[news.category] || 'bg-slate-100 text-slate-700'}`}>
            หมวดหมู่: {news.category}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-tropical-50 text-tropical-900 font-medium border border-tropical-200">
            ผู้สื่อข่าว: {news.reporter}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-tropical-50 text-tropical-900 font-medium border border-tropical-200">
            วันที่เผยแพร่: {news.publishedDate}
          </span>
          <span className={`px-2.5 py-1 rounded-full border font-medium ${news.status ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
            สถานะ: {news.status ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}
          </span>
        </div>

        {/* เนื้อหาข่าว */}
        <div className="p-6 text-sm text-tropical-950 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
          {news.description ? (
            <p className="bg-tropical-50/50 p-4 rounded-xl border border-tropical-100 text-tropical-900">{news.description}</p>
          ) : (
            <p className="text-tropical-400 italic">ไม่มีรายละเอียดเนื้อหาข่าวเพิ่มเติม</p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-tropical-50/60 border-t border-tropical-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-tropical-100 hover:bg-tropical-200 text-tropical-900 font-semibold text-sm rounded-xl transition border border-tropical-200"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
