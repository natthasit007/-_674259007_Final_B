import React, { useState, useEffect } from 'react';

const CATEGORIES = ['การศึกษา', 'เทคโนโลยี', 'สังคม'];

export default function NewsForm({ onSubmit, editingNews, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    reporter: '',
    category: 'การศึกษา',
    publishedDate: new Date().toISOString().split('T')[0],
    description: '',
    status: true
  });
  const [validationError, setValidationError] = useState('');

  // เมื่ออยู่ในโหมดแก้ไข ให้โหลดข้อมูลข่าวเดิมมาใส่ในฟอร์ม
  useEffect(() => {
    if (editingNews) {
      setFormData({
        title: editingNews.title || '',
        reporter: editingNews.reporter || '',
        category: editingNews.category || 'การศึกษา',
        publishedDate: editingNews.publishedDate || new Date().toISOString().split('T')[0],
        description: editingNews.description || '',
        status: editingNews.status ?? true
      });
      setValidationError('');
    } else {
      resetForm();
    }
  }, [editingNews]);

  const resetForm = () => {
    setFormData({
      title: '',
      reporter: '',
      category: 'การศึกษา',
      publishedDate: new Date().toISOString().split('T')[0],
      description: '',
      status: true
    });
    setValidationError('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const titleTrimmed = formData.title.trim();
    const reporterTrimmed = formData.reporter.trim();

    // Validation ฝั่งหน้าเว็บ
    if (!titleTrimmed) {
      setValidationError('กรุณาระบุหัวข้อข่าว');
      return;
    }
    if (titleTrimmed.length > 150) {
      setValidationError('หัวข้อข่าวต้องมีความยาวไม่เกิน 150 ตัวอักษร');
      return;
    }

    if (!reporterTrimmed) {
      setValidationError('กรุณาระบุชื่อผู้สื่อข่าว');
      return;
    }
    if (reporterTrimmed.length > 100) {
      setValidationError('ชื่อผู้สื่อข่าวต้องมีความยาวไม่เกิน 100 ตัวอักษร');
      return;
    }

    if (!formData.publishedDate) {
      setValidationError('กรุณาระบุวันที่เผยแพร่');
      return;
    }

    setValidationError('');

    onSubmit({
      ...formData,
      title: titleTrimmed,
      reporter: reporterTrimmed,
      description: formData.description.trim()
    });

    if (!editingNews) {
      resetForm();
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-tropical-200 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-tropical-900 flex items-center gap-2">
          {editingNews ? '📝 แก้ไขข้อมูลข่าวสาร' : '➕ เพิ่มข่าวสารใหม่'}
        </h2>
        {editingNews && (
          <span className="text-xs bg-tropical-100 text-tropical-900 border border-tropical-300 px-3 py-1 rounded-full font-semibold">
            กำลังแก้ไขข่าว ID: {editingNews.id}
          </span>
        )}
      </div>

      {validationError && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-red-700 text-sm flex items-center justify-between">
          <span>⚠️ {validationError}</span>
          <button 
            type="button" 
            onClick={() => setValidationError('')} 
            className="text-red-400 hover:text-red-600 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* หัวข้อข่าว */}
          <div>
            <label className="block text-sm font-semibold text-tropical-900 mb-1">
              หัวข้อข่าว <span className="text-red-500">*</span>
              <span className="text-xs font-normal text-tropical-600/70 ml-1">({formData.title.length}/150)</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={150}
              placeholder="ระบุหัวข้อข่าว..."
              className="w-full px-3.5 py-2 bg-tropical-50/50 border border-tropical-200 rounded-lg text-sm text-tropical-900 placeholder-tropical-400 focus:bg-white focus:ring-2 focus:ring-tropical-400 focus:border-tropical-500 focus:outline-none transition"
            />
          </div>

          {/* ผู้สื่อข่าว */}
          <div>
            <label className="block text-sm font-semibold text-tropical-900 mb-1">
              ผู้สื่อข่าว <span className="text-red-500">*</span>
              <span className="text-xs font-normal text-tropical-600/70 ml-1">({formData.reporter.length}/100)</span>
            </label>
            <input
              type="text"
              name="reporter"
              value={formData.reporter}
              onChange={handleChange}
              maxLength={100}
              placeholder="ระบุชื่อผู้สื่อข่าว..."
              className="w-full px-3.5 py-2 bg-tropical-50/50 border border-tropical-200 rounded-lg text-sm text-tropical-900 placeholder-tropical-400 focus:bg-white focus:ring-2 focus:ring-tropical-400 focus:border-tropical-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* หมวดหมู่ */}
          <div>
            <label className="block text-sm font-semibold text-tropical-900 mb-1">
              หมวดหมู่ <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-tropical-50/50 border border-tropical-200 rounded-lg text-sm text-tropical-900 focus:bg-white focus:ring-2 focus:ring-tropical-400 focus:border-tropical-500 focus:outline-none transition"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* วันที่เผยแพร่ */}
          <div>
            <label className="block text-sm font-semibold text-tropical-900 mb-1">
              วันที่เผยแพร่ <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-tropical-50/50 border border-tropical-200 rounded-lg text-sm text-tropical-900 focus:bg-white focus:ring-2 focus:ring-tropical-400 focus:border-tropical-500 focus:outline-none transition"
            />
          </div>

          {/* สถานะ */}
          <div>
            <label className="block text-sm font-semibold text-tropical-900 mb-1">
              สถานะ
            </label>
            <select
              name="status"
              value={formData.status ? 'true' : 'false'}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value === 'true' }))}
              className="w-full px-3.5 py-2 bg-tropical-50/50 border border-tropical-200 rounded-lg text-sm text-tropical-900 focus:bg-white focus:ring-2 focus:ring-tropical-400 focus:border-tropical-500 focus:outline-none transition"
            >
              <option value="true">✅ เผยแพร่ (Published)</option>
              <option value="false">📝 ฉบับร่าง (Draft)</option>
            </select>
          </div>
        </div>

        {/* เนื้อหาข่าว */}
        <div>
          <label className="block text-sm font-semibold text-tropical-900 mb-1">
            เนื้อหาข่าว / รายละเอียด
          </label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="รายละเอียดเนื้อหาข่าวสารเพิ่มเติม (ถ้ามี)..."
            className="w-full px-3.5 py-2 bg-tropical-50/50 border border-tropical-200 rounded-lg text-sm text-tropical-900 placeholder-tropical-400 focus:bg-white focus:ring-2 focus:ring-tropical-400 focus:border-tropical-500 focus:outline-none transition"
          />
        </div>

        {/* ปุ่มบันทึก และ ปุ่มยกเลิก (เมื่อแก้ไข) */}
        <div className="flex gap-3 justify-end pt-3 border-t border-tropical-100">
          {editingNews && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-medium text-sm transition"
            >
              ยกเลิกการแก้ไข
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-tropical-600 hover:bg-tropical-700 active:bg-tropical-800 text-white font-semibold text-sm transition shadow-md shadow-tropical-200 hover:shadow-lg"
          >
            {editingNews ? 'บันทึกการแก้ไข' : 'บันทึกข่าวใหม่'}
          </button>
        </div>
      </form>
    </div>
  );
}
