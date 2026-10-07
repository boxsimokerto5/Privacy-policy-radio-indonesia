/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Copy,
  Check,
  Printer,
  Download,
  ExternalLink,
  Mail,
  ChevronRight,
  ArrowUpRight,
  FileText,
} from 'lucide-react';
import {
  APP_METADATA,
  POLICY_SECTIONS,
  PERMISSIONS_LIST,
  AD_PARTNERS,
  RAW_POLICY_TEXT_ID,
  RAW_POLICY_TEXT_EN,
  type Language,
} from './data/policyData';

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [activeSection, setActiveSection] = useState<string>('informasi-lokal');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'document' | 'datasafety' | 'raw'>('document');
  const [copiedType, setCopiedType] = useState<'text' | 'url' | 'package' | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [expandedGuide, setExpandedGuide] = useState<'adid' | 'storage' | null>('adid');

  // Track scroll progress and active chapter
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }

      if (viewMode !== 'document') return;

      const sectionOffsets = POLICY_SECTIONS.map((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return { id: sec.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: sec.id, top: Math.abs(rect.top - 140) };
      });

      const closest = sectionOffsets.reduce((prev, curr) =>
        curr.top < prev.top ? curr : prev
      );
      if (closest && closest.top < Infinity) {
        setActiveSection(closest.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  const handleCopy = async (content: string, type: 'text' | 'url' | 'package') => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2200);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2200);
    }
  };

  const handleDownloadTxt = () => {
    const rawContent = lang === 'id' ? RAW_POLICY_TEXT_ID : RAW_POLICY_TEXT_EN;
    const blob = new Blob([rawContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `privacy-policy-radio-indonesia-${lang}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scrollToSection = (id: string) => {
    if (viewMode !== 'document') {
      setViewMode('document');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(id);
  };

  const filteredPermissions = useMemo(() => {
    if (!searchQuery.trim()) return PERMISSIONS_LIST;
    const q = searchQuery.toLowerCase();
    return PERMISSIONS_LIST.filter(
      (p) =>
        p.code.toLowerCase().includes(q) ||
        p.title[lang].toLowerCase().includes(q) ||
        p.description[lang].toLowerCase().includes(q) ||
        p.category[lang].toLowerCase().includes(q)
    );
  }, [searchQuery, lang]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
      {/* Reading Depth Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-[#EBE6DF] z-50 no-print">
        <div
          className="h-full bg-[#9A3412] transition-transform duration-150 origin-left"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-200 px-6 lg:px-12 py-4 no-print">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setViewMode('document');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg font-editorial font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
          >
            Radio Indonesia — Suara Nusantara
          </a>

          {/* Zone 2: 4–5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => scrollToSection('informasi-lokal')}
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'id' ? 'Data Lokal' : 'Local Data'}
            </button>
            <button
              onClick={() => scrollToSection('izin-aplikasi')}
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'id' ? 'Izin Android' : 'Permissions'}
            </button>
            <button
              onClick={() => scrollToSection('periklanan-pihak-ketiga')}
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'id' ? 'Mitra Iklan' : 'Ad Partners'}
            </button>
            <button
              onClick={() => scrollToSection('retensi-kontrol')}
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'id' ? 'Kontrol Privasi' : 'User Controls'}
            </button>
            <button
              onClick={() => scrollToSection('hubungi-kami')}
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'id' ? 'Kontak' : 'Contact'}
            </button>
          </nav>

          {/* Zone 3: 1–2 primary actions */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center p-0.5 bg-[#EBE6DF] rounded-md">
              <button
                onClick={() => setLang('id')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  lang === 'id'
                    ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() =>
                handleCopy(
                  lang === 'id' ? RAW_POLICY_TEXT_ID : RAW_POLICY_TEXT_EN,
                  'text'
                )
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#9A3412] rounded-md hover:bg-[#7C2D12] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedType === 'text' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? 'Tersalin' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? 'Salin Dokumen' : 'Copy Policy'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="top" className="flex-1 max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-10 lg:py-16 print-full-width">
        {/* Institutional Hero & Accession Metadata Strip */}
        <section className="pb-10 border-b border-stone-300">
          {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs uppercase tracking-widest text-stone-500 mb-4">
            <span>{lang === 'id' ? 'Dokumen Resmi Kepatuhan Google Play' : 'Official Google Play Compliance Document'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tech">{APP_METADATA.packageName}</span>
            <span aria-hidden="true">·</span>
            <span>
              {lang === 'id' ? 'Tanggal Berlaku:' : 'Effective Date:'}{' '}
              <time dateTime={APP_METADATA.isoDate}>{APP_METADATA.effectiveDate[lang]}</time>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-normal text-stone-900 tracking-tight leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                {lang === 'id'
                  ? 'Kebijakan Privasi & Transparansi Keamanan Data'
                  : 'Privacy Policy & Data Safety Transparency'}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
                {lang === 'id' ? (
                  <>
                    Selamat datang di <strong>Radio Indonesia - Suara Nusantara</strong> ("Aplikasi").
                    Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan,
                    melindungi, dan mengungkapkan informasi ketika Anda menggunakan aplikasi seluler
                    Radio Indonesia (<code className="font-mono-tech text-sm text-stone-900">com.radioindonesia.gecckocreator</code>)
                    yang tersedia di Google Play Store.
                  </>
                ) : (
                  <>
                    Welcome to <strong>Radio Indonesia - Suara Nusantara</strong> ("Application").
                    This Privacy Policy explains how we collect, use, protect, and disclose information
                    when you use the Radio Indonesia mobile application (
                    <code className="font-mono-tech text-sm text-stone-900">com.radioindonesia.gecckocreator</code>)
                    available on the Google Play Store.
                  </>
                )}
              </p>
            </div>

            {/* Interactive View Switcher & Utility Controls */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-end gap-3 no-print">
              <div className="inline-flex items-center p-1 bg-[#EBE6DF] rounded-lg w-full sm:w-auto">
                <button
                  onClick={() => setViewMode('document')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    viewMode === 'document'
                      ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lang === 'id' ? 'Naskah Lengkap' : 'Full Document'}
                </button>
                <button
                  onClick={() => setViewMode('datasafety')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    viewMode === 'datasafety'
                      ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lang === 'id' ? 'Matriks Google Play' : 'Play Data Safety'}
                </button>
                <button
                  onClick={() => setViewMode('raw')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    viewMode === 'raw'
                      ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lang === 'id' ? 'Teks Mentah' : 'Plain Text'}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-600">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 rounded-md hover:bg-[#EBE6DF]/60 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? 'Cetak / PDF' : 'Print / PDF'}</span>
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 rounded-md hover:bg-[#EBE6DF]/60 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? 'Unduh .TXT' : 'Download .TXT'}</span>
                </button>
                <button
                  onClick={() => handleCopy(window.location.href, 'url')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 rounded-md hover:bg-[#EBE6DF]/60 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copiedType === 'url' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#14532D]" />
                      <span className="text-[#14532D]">{lang === 'id' ? 'URL Disalin' : 'URL Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'id' ? 'Salin URL' : 'Copy URL'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Operational Utility & Accession Metadata Grid */}
          <dl className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-widest text-stone-500">
                {lang === 'id' ? 'Nama Aplikasi' : 'Application Title'}
              </dt>
              <dd className="mt-1 font-semibold text-stone-900">
                {APP_METADATA.appName}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-stone-500">
                {lang === 'id' ? 'Identitas Paket (Package ID)' : 'Android Package Name'}
              </dt>
              <dd className="mt-1 flex items-center gap-2">
                <code className="font-mono-tech text-xs text-stone-900">
                  {APP_METADATA.packageName}
                </code>
                <button
                  onClick={() => handleCopy(APP_METADATA.packageName, 'package')}
                  title={lang === 'id' ? 'Salin Package Name' : 'Copy Package Name'}
                  className="text-stone-500 hover:text-stone-900 transition-colors no-print cursor-pointer"
                >
                  {copiedType === 'package' ? (
                    <Check className="w-3.5 h-3.5 text-[#14532D]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-stone-500">
                {lang === 'id' ? 'Model Akun & Penyimpanan' : 'Account & Storage Model'}
              </dt>
              <dd className="mt-1 text-stone-800">
                {lang === 'id'
                  ? 'Tanpa Login · SharedPreferences Lokal'
                  : 'No Login Required · Local SharedPreferences'}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-stone-500">
                {lang === 'id' ? 'Email Pengembang Resmi' : 'Official Developer Contact'}
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${APP_METADATA.developerEmail}`}
                  className="font-mono-tech text-xs text-[#9A3412] hover:underline"
                >
                  {APP_METADATA.developerEmail}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        {/* VIEW MODE 1: FULL EDITORIAL PRIVACY POLICY DOCUMENT */}
        {viewMode === 'document' && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left/Margin Rail: Sticky Chapter Index & Quick Filter (4 cols on lg) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 no-print">
              <div className="bg-[#EBE6DF]/55 border border-stone-200/90 rounded-lg p-5">
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-3">
                  {lang === 'id' ? 'Daftar Isi Kebijakan' : 'Table of Contents'}
                </div>
                <nav aria-label="Policy Sections" className="space-y-1">
                  {POLICY_SECTIONS.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors flex items-baseline gap-2.5 cursor-pointer ${
                          isActive
                            ? 'bg-[#FBF9F5] text-[#9A3412] font-semibold border-l-2 border-[#9A3412]'
                            : 'text-stone-700 hover:text-stone-900 hover:bg-[#FBF9F5]/50'
                        }`}
                      >
                        <span className="font-mono-tech text-[11px] text-stone-400 shrink-0">
                          {sec.number}.
                        </span>
                        <span className="truncate">{sec.title[lang]}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Consent Summary Callout */}
                <div className="mt-6 pt-5 border-t border-stone-300/70 text-xs text-stone-600 leading-relaxed">
                  <p className="font-medium text-stone-900 mb-1">
                    {lang === 'id' ? 'Pernyataan Persetujuan' : 'Consent Statement'}
                  </p>
                  <p>
                    {lang === 'id'
                      ? 'Dengan mengunduh atau menggunakan Aplikasi ini, Anda menyetujui praktik yang dijelaskan dalam Kebijakan Privasi ini.'
                      : 'By downloading or using this Application, you agree to the practices described in this Privacy Policy.'}
                  </p>
                </div>
              </div>
            </aside>

            {/* Right/Main Reading Column: 65–75ch Measure (8 cols on lg) */}
            <article className="lg:col-span-8 max-w-prose space-y-14">
              {/* Opening Editorial Lead */}
              <div className="pb-8 border-b border-stone-200">
                <p className="text-stone-800 leading-relaxed text-base first-letter:text-5xl first-letter:font-editorial first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#9A3412]">
                  {lang === 'id'
                    ? 'Selamat datang di Radio Indonesia ("Aplikasi"). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan mengungkapkan informasi ketika Anda menggunakan aplikasi seluler Radio Indonesia (com.radioindonesia.gecckocreator) yang tersedia di Google Play Store. Dengan mengunduh atau menggunakan Aplikasi ini, Anda menyetujui praktik yang dijelaskan dalam Kebijakan Privasi ini.'
                    : 'Welcome to Radio Indonesia ("Application"). This Privacy Policy explains how we collect, use, protect, and disclose information when you use the Radio Indonesia mobile application (com.radioindonesia.gecckocreator) available on the Google Play Store. By downloading or using this Application, you agree to the practices described in this Privacy Policy.'}
                </p>
              </div>

              {/* PASAL 1: INFORMASI YANG DISIMPAN SECARA LOKAL DI PERANGKAT */}
              <section id="informasi-lokal" className="scroll-mt-24 space-y-4">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-mono-tech">
                  01 / {lang === 'id' ? 'PENYIMPANAN LOKAL' : 'LOCAL STORAGE'}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900"
                  style={{ textWrap: 'balance' }}
                >
                  1. {POLICY_SECTIONS[0].title[lang]}
                </h2>
                <p className="text-stone-800 leading-relaxed text-[15.5px]">
                  {lang === 'id' ? (
                    <>
                      Aplikasi Radio Indonesia <strong>tidak mewajibkan pengguna untuk membuat akun atau melakukan pendaftaran (login)</strong>. Data preferensi pengguna berikut disimpan sepenuhnya secara lokal di memori internal perangkat Anda (melalui <code className="font-mono-tech text-xs bg-[#EBE6DF] px-1.5 py-0.5 rounded">Android SharedPreferences</code>) dan <strong>tidak pernah dikirimkan atau disimpan di server kami</strong>:
                    </>
                  ) : (
                    <>
                      The Radio Indonesia Application <strong>does not require users to create an account or register (log in)</strong>. The following user preference data is stored entirely locally within your device&apos;s internal memory (via <code className="font-mono-tech text-xs bg-[#EBE6DF] px-1.5 py-0.5 rounded">Android SharedPreferences</code>) and is <strong>never transmitted to or stored on our servers</strong>:
                    </>
                  )}
                </p>

                <div className="mt-4 border-t border-b border-stone-200 divide-y divide-stone-200">
                  <div className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="font-medium text-stone-900 text-sm">
                      {lang === 'id'
                        ? 'Nama tampilan profil dan kota domisili pilihan Anda'
                        : 'Your chosen display profile name and city of residence'}
                    </span>
                    <span className="text-xs font-mono-tech text-stone-500 shrink-0">
                      SharedPreferences · Local Only
                    </span>
                  </div>
                  <div className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="font-medium text-stone-900 text-sm">
                      {lang === 'id'
                        ? 'Daftar stasiun radio favorit dan riwayat stasiun terakhir yang diputar'
                        : 'Your list of favorite radio stations and recently played station history'}
                    </span>
                    <span className="text-xs font-mono-tech text-stone-500 shrink-0">
                      SharedPreferences · Local Only
                    </span>
                  </div>
                  <div className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="font-medium text-stone-900 text-sm">
                      {lang === 'id'
                        ? 'Catatan jadwal siaran pada fitur Kalender di dalam aplikasi'
                        : 'Broadcast schedule notes within the in-app Calendar feature'}
                    </span>
                    <span className="text-xs font-mono-tech text-stone-500 shrink-0">
                      SharedPreferences · Local Only
                    </span>
                  </div>
                </div>
              </section>

              {/* PASAL 2: IZIN APLIKASI YANG DIGUNAKAN (APP PERMISSIONS) */}
              <section id="izin-aplikasi" className="scroll-mt-24 space-y-5">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-mono-tech">
                  02 / ANDROID MANIFEST PERMISSIONS
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <h2
                    className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900"
                    style={{ textWrap: 'balance' }}
                  >
                    2. {POLICY_SECTIONS[1].title[lang]}
                  </h2>
                </div>

                <p className="text-stone-800 leading-relaxed text-[15.5px]">
                  {lang === 'id'
                    ? 'Untuk menjalankan fungsi utamanya sebagai pemutar streaming radio online, Aplikasi memerlukan izin berikut pada sistem operasi Android:'
                    : 'To perform its primary function as an online radio streaming player, the Application requires the following permissions on the Android operating system:'}
                </p>

                {/* Interactive Permission Filter Bar */}
                <div className="relative no-print">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      lang === 'id'
                        ? 'Cari kode izin Android (mis. FOREGROUND_SERVICE, AD_ID, BMKG)...'
                        : 'Filter Android permissions (e.g., FOREGROUND_SERVICE, AD_ID, BMKG)...'
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-[#EBE6DF]/45 border border-stone-300 rounded-md text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#9A3412]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-900 cursor-pointer"
                    >
                      {lang === 'id' ? 'Reset' : 'Clear'}
                    </button>
                  )}
                </div>

                {/* Permission List */}
                <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
                  {filteredPermissions.length === 0 ? (
                    <div className="py-8 text-center text-sm text-stone-500">
                      {lang === 'id'
                        ? `Tidak ada izin yang cocok dengan pencarian "${searchQuery}".`
                        : `No permission matches "${searchQuery}".`}
                    </div>
                  ) : (
                    filteredPermissions.map((perm) => (
                      <div key={perm.id} className="py-5 space-y-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-base font-semibold text-stone-900">
                            {perm.id}. {perm.title[lang]}
                          </h3>
                          <span className="text-xs text-stone-500">
                            {perm.category[lang]} · {perm.requiredLevel[lang]}
                          </span>
                        </div>
                        <div>
                          <code className="font-mono-tech text-xs text-[#9A3412] break-all">
                            {perm.code}
                          </code>
                        </div>
                        <p className="text-sm text-stone-700 leading-relaxed pt-1">
                          {perm.description[lang]}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* PASAL 3: LAYANAN PERIKLANAN PIHAK KETIGA & PENGUMPULAN DATA OTOMATIS */}
              <section id="periklanan-pihak-ketiga" className="scroll-mt-24 space-y-5">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-mono-tech">
                  03 / {lang === 'id' ? 'MITRA MEDIASI IKLAN & SDK' : 'AD MEDIATION PARTNERS & SDKS'}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900"
                  style={{ textWrap: 'balance' }}
                >
                  3. {POLICY_SECTIONS[2].title[lang]}
                </h2>
                <p className="text-stone-800 leading-relaxed text-[15.5px]">
                  {lang === 'id'
                    ? 'Aplikasi Radio Indonesia disediakan secara gratis dan didukung oleh penayangan iklan. Kami bekerja sama dengan jaringan mediasi iklan pihak ketiga resmi yang dapat mengumpulkan dan memproses data tertentu secara otomatis dari perangkat Anda, yaitu:'
                    : 'The Radio Indonesia Application is provided free of charge and is supported by advertising. We partner with official third-party ad mediation networks that may automatically collect and process certain data from your device, namely:'}
                </p>

                <ul className="space-y-3 pl-5 list-disc text-stone-800 text-[15px] leading-relaxed marker:text-[#9A3412]">
                  <li>
                    {lang === 'id' ? (
                      <>
                        <strong>Pengenal Iklan Android</strong> (Google Advertising ID / AAID) dan App Set ID.
                      </>
                    ) : (
                      <>
                        <strong>Android Advertising ID</strong> (Google Advertising ID / AAID) and App Set ID.
                      </>
                    )}
                  </li>
                  <li>
                    {lang === 'id' ? (
                      <>
                        <strong>Informasi teknis perangkat</strong> (model perangkat, versi sistem operasi Android, bahasa, dan operator jaringan).
                      </>
                    ) : (
                      <>
                        <strong>Technical device information</strong> (device model, Android operating system version, language, and network carrier).
                      </>
                    )}
                  </li>
                  <li>
                    {lang === 'id' ? (
                      <>
                        <strong>Alamat IP (Internet Protocol) sementara</strong> untuk memperkirakan wilayah umum (negara/kota) guna menampilkan iklan yang relevan.
                      </>
                    ) : (
                      <>
                        <strong>Temporary IP (Internet Protocol) address</strong> to estimate general region (country/city) in order to display relevant advertisements.
                      </>
                    )}
                  </li>
                  <li>
                    {lang === 'id' ? (
                      <>
                        <strong>Data interaksi iklan</strong> (jumlah tayangan banner, native, interstitial, dan rewarded video) serta diagnostik kerusakan (crash logs).
                      </>
                    ) : (
                      <>
                        <strong>Ad interaction data</strong> (impression counts for banner, native, interstitial, and rewarded video ads) as well as diagnostic crash logs.
                      </>
                    )}
                  </li>
                </ul>

                {/* Third-Party Partners Directory */}
                <div className="pt-4">
                  <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-3">
                    {lang === 'id'
                      ? 'Mitra Periklanan Pihak Ketiga Resmi & Tautan Kebijakan Privasi'
                      : 'Official Third-Party Advertising Partners & Privacy Policy Links'}
                  </h3>
                  <div className="border-t border-b border-stone-200 divide-y divide-stone-200">
                    {AD_PARTNERS.map((partner) => (
                      <div
                        key={partner.name}
                        className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 text-sm">
                            {partner.name}
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5">
                            {partner.role[lang]}
                          </div>
                        </div>
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#9A3412] hover:underline shrink-0"
                        >
                          <span>{partner.url}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* PASAL 4: KEAMANAN DATA & ENKRIPSI */}
              <section id="keamanan-data" className="scroll-mt-24 space-y-4">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-mono-tech">
                  04 / {lang === 'id' ? 'KEAMANAN JARINGAN' : 'NETWORK SECURITY'}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900"
                  style={{ textWrap: 'balance' }}
                >
                  4. {POLICY_SECTIONS[3].title[lang]}
                </h2>
                <p className="text-stone-800 leading-relaxed text-[15.5px]">
                  {lang === 'id' ? (
                    <>
                      Seluruh komunikasi jaringan antara Aplikasi dan mitra layanan periklanan pihak ketiga dikirimkan melalui jalur koneksi aman yang dienkripsi menggunakan protokol{' '}
                      <code className="font-mono-tech text-xs bg-[#EBE6DF] px-1.5 py-0.5 rounded">
                        HTTPS/TLS (Transport Layer Security)
                      </code>
                      .
                    </>
                  ) : (
                    <>
                      All network communications between the Application and third-party advertising service partners are transmitted over a secure connection encrypted using the{' '}
                      <code className="font-mono-tech text-xs bg-[#EBE6DF] px-1.5 py-0.5 rounded">
                        HTTPS/TLS (Transport Layer Security)
                      </code>{' '}
                      protocol.
                    </>
                  )}
                </p>
              </section>

              {/* PASAL 5: RETENSI, KONTROL PENGGUNA & PENGHAPUSAN DATA */}
              <section id="retensi-kontrol" className="scroll-mt-24 space-y-5">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-mono-tech">
                  05 / {lang === 'id' ? 'HAK & KONTROL PENGGUNA' : 'USER RIGHTS & CONTROLS'}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900"
                  style={{ textWrap: 'balance' }}
                >
                  5. {POLICY_SECTIONS[4].title[lang]}
                </h2>

                {/* Interactive Step-by-Step Controls */}
                <div className="space-y-4">
                  <div className="border border-stone-200 rounded-lg bg-[#EBE6DF]/35 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base font-semibold text-stone-900">
                        {lang === 'id'
                          ? 'Pengaturan Ulang / Penghapusan ID Iklan (Google Advertising ID)'
                          : 'Resetting / Deleting Google Advertising ID'}
                      </h3>
                      <button
                        onClick={() =>
                          setExpandedGuide(expandedGuide === 'adid' ? null : 'adid')
                        }
                        className="text-xs text-[#9A3412] font-medium hover:underline no-print shrink-0 cursor-pointer"
                      >
                        {expandedGuide === 'adid'
                          ? lang === 'id'
                            ? 'Sembunyikan Alur'
                            : 'Hide Path'
                          : lang === 'id'
                          ? 'Lihat Alur Android'
                          : 'Show Android Path'}
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                      {lang === 'id'
                        ? 'Anda dapat mengatur ulang (reset) atau menghapus Pengenal Iklan Google (Advertising ID) kapan saja melalui perangkat Android Anda di menu:'
                        : 'You can reset or delete your Google Advertising ID at any time through your Android device menu:'}
                    </p>
                    {expandedGuide === 'adid' && (
                      <div className="mt-3 pt-3 border-t border-stone-200/80 flex flex-wrap items-center gap-1.5 font-mono-tech text-xs text-stone-800">
                        <span>{lang === 'id' ? 'Pengaturan (Settings)' : 'Settings'}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                        <span>Google</span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                        <span>{lang === 'id' ? 'Iklan (Ads)' : 'Ads'}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                        <span className="text-[#9A3412] font-medium">
                          {lang === 'id'
                            ? 'Hapus ID Iklan / Reset ID Iklan'
                            : 'Delete advertising ID / Reset advertising ID'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border border-stone-200 rounded-lg bg-[#EBE6DF]/35 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base font-semibold text-stone-900">
                        {lang === 'id'
                          ? 'Penghapusan Data Lokal (Tanpa Akun Server)'
                          : 'Deleting Local Preference Data (Zero Server Account)'}
                      </h3>
                      <button
                        onClick={() =>
                          setExpandedGuide(expandedGuide === 'storage' ? null : 'storage')
                        }
                        className="text-xs text-[#9A3412] font-medium hover:underline no-print shrink-0 cursor-pointer"
                      >
                        {expandedGuide === 'storage'
                          ? lang === 'id'
                            ? 'Sembunyikan Alur'
                            : 'Hide Path'
                          : lang === 'id'
                          ? 'Lihat Alur Android'
                          : 'Show Android Path'}
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                      {lang === 'id'
                        ? 'Karena Aplikasi tidak membuat akun pengguna dan tidak menyimpan data pribadi di server kami, Anda dapat menghapus seluruh data preferensi lokal kapan saja dengan memilih menu "Hapus Data / Clear Storage" di pengaturan aplikasi Android atau dengan mencopot pemasangan (uninstall) Aplikasi Radio Indonesia dari perangkat Anda.'
                        : 'Because the Application does not create user accounts and does not store personal data on our servers, you can delete all local preference data at any time by selecting "Clear Storage / Clear Data" in your Android application settings or by uninstalling the Radio Indonesia Application from your device.'}
                    </p>
                    {expandedGuide === 'storage' && (
                      <div className="mt-3 pt-3 border-t border-stone-200/80 flex flex-wrap items-center gap-1.5 font-mono-tech text-xs text-stone-800">
                        <span>{lang === 'id' ? 'Pengaturan (Settings)' : 'Settings'}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                        <span>{lang === 'id' ? 'Aplikasi (Apps)' : 'Apps'}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                        <span>Radio Indonesia</span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                        <span className="text-[#9A3412] font-medium">
                          {lang === 'id'
                            ? 'Penyimpanan > Hapus Data (Clear Storage)'
                            : 'Storage > Clear Storage / Uninstall'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* PASAL 6: PERLINDUNGAN PRIVASI ANAK-ANAK */}
              <section id="privasi-anak" className="scroll-mt-24 space-y-4">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-mono-tech">
                  06 / {lang === 'id' ? 'BATAS USIA AUDIENS' : 'AGE RATING & CHILDREN'}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900"
                  style={{ textWrap: 'balance' }}
                >
                  6. {POLICY_SECTIONS[5].title[lang]}
                </h2>
                <p className="text-stone-800 leading-relaxed text-[15.5px]">
                  {lang === 'id'
                    ? 'Aplikasi Radio Indonesia ditujukan untuk audiens umum berusia 13 tahun ke atas dan tidak dirancang khusus untuk anak-anak di bawah usia 13 tahun. Kami tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak di bawah usia 13 tahun.'
                    : 'The Radio Indonesia Application is intended for a general audience aged 13 and older and is not specifically designed for children under the age of 13. We do not knowingly collect personal information from children under 13 years of age.'}
                </p>
              </section>

              {/* PASAL 7: HAK CIPTA SIARAN RADIO */}
              <section id="hak-cipta" className="scroll-mt-24 space-y-4">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-mono-tech">
                  07 / {lang === 'id' ? 'KEKAYAAN INTELEKTUAL PENYIARAN' : 'BROADCAST COPYRIGHT'}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900"
                  style={{ textWrap: 'balance' }}
                >
                  7. {POLICY_SECTIONS[6].title[lang]}
                </h2>
                <blockquote className="border-l-2 border-[#9A3412] pl-5 py-1 my-4">
                  <p className="text-stone-800 leading-relaxed text-[15.5px]">
                    {lang === 'id'
                      ? 'Seluruh aliran audio (audio streams), nama stasiun radio, frekuensi, slogan, dan logo stasiun yang ditampilkan di dalam Aplikasi merupakan hak cipta dan milik masing-masing lembaga penyiaran resmi terkait. Aplikasi Radio Indonesia hanya menyediakan direktori penautan streaming publik untuk memudahkan pendengar di seluruh Nusantara.'
                      : 'All audio streams, radio station names, frequencies, slogans, and station logos displayed within the Application are the copyright and property of their respective official broadcasting institutions. The Radio Indonesia Application solely provides a public streaming link directory to facilitate listeners across the Indonesian Archipelago (Nusantara).'}
                  </p>
                </blockquote>
              </section>

              {/* PASAL 8: PERUBAHAN PADA KEBIJAKAN PRIVASI INI */}
              <section id="perubahan-kebijakan" className="scroll-mt-24 space-y-4">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-mono-tech">
                  08 / {lang === 'id' ? 'PEMBARUAN DOKUMEN' : 'POLICY REVISIONS'}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900"
                  style={{ textWrap: 'balance' }}
                >
                  8. {POLICY_SECTIONS[7].title[lang]}
                </h2>
                <p className="text-stone-800 leading-relaxed text-[15.5px]">
                  {lang === 'id'
                    ? 'Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu menyesuaikan dengan pembaruan fitur atau regulasi Google Play. Setiap perubahan akan ditampilkan pada halaman ini dengan memperbarui tanggal berlaku di bagian atas.'
                    : 'We may update this Privacy Policy from time to time to reflect feature updates or Google Play regulatory requirements. Any changes will be posted on this page by updating the effective date at the top.'}
                </p>
              </section>

              {/* PASAL 9: HUBUNGI KAMI (CONTACT US) */}
              <section id="hubungi-kami" className="scroll-mt-24 space-y-4 pt-4 border-t border-stone-300">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-mono-tech">
                  09 / {lang === 'id' ? 'KONTAK PENGEMBANG' : 'DEVELOPER CONTACT'}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900"
                  style={{ textWrap: 'balance' }}
                >
                  9. {POLICY_SECTIONS[8].title[lang]}
                </h2>
                <p className="text-stone-800 leading-relaxed text-[15.5px]">
                  {lang === 'id'
                    ? 'Apabila Anda memiliki pertanyaan, masukan, atau permintaan terkait Kebijakan Privasi ini maupun layanan Aplikasi Radio Indonesia, silakan hubungi kami melalui:'
                    : 'If you have any questions, feedback, or requests regarding this Privacy Policy or the Radio Indonesia Application services, please contact us via:'}
                </p>

                <div className="p-6 bg-[#EBE6DF]/60 border border-stone-300 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs uppercase tracking-widest text-stone-500">
                      {lang === 'id' ? 'Email Pengembang Resmi' : 'Official Developer Email'}
                    </div>
                    <div className="font-mono-tech text-base font-medium text-stone-900">
                      {APP_METADATA.developerEmail}
                    </div>
                    <div className="text-xs text-stone-600">
                      {APP_METADATA.appName} ({APP_METADATA.packageName})
                    </div>
                  </div>

                  <a
                    href={`mailto:${APP_METADATA.developerEmail}?subject=${encodeURIComponent(
                      'Pertanyaan Kebijakan Privasi - Radio Indonesia (com.radioindonesia.gecckocreator)'
                    )}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-[#9A3412] rounded-md hover:bg-[#7C2D12] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{lang === 'id' ? 'Kirim Email Sekarang' : 'Send Email Inquiry'}</span>
                  </a>
                </div>
              </section>
            </article>
          </div>
        )}

        {/* VIEW MODE 2: GOOGLE PLAY DATA SAFETY MATRIX */}
        {viewMode === 'datasafety' && (
          <section className="mt-10 space-y-8">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-widest text-stone-500 font-mono-tech mb-2">
                GOOGLE PLAY CONSOLE · DATA SAFETY DISCLOSURE
              </div>
              <h2
                className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900"
                style={{ textWrap: 'balance' }}
              >
                {lang === 'id'
                  ? 'Ringkasan Keamanan Data Google Play'
                  : 'Google Play Data Safety Summary Matrix'}
              </h2>
              <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                {lang === 'id'
                  ? 'Tabel di bawah ini memetakan praktik privasi Radio Indonesia - Suara Nusantara secara langsung ke standar formulir Keamanan Data (Data Safety) Google Play Store.'
                  : 'The table below maps Radio Indonesia - Suara Nusantara privacy practices directly to the Google Play Store Data Safety disclosure standard.'}
              </p>
            </div>

            <div className="overflow-x-auto border border-stone-300 rounded-lg bg-[#FBF9F5]">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-stone-300 bg-[#EBE6DF]/70 text-xs uppercase tracking-wider text-stone-600">
                    <th className="py-3.5 px-4 font-semibold">
                      {lang === 'id' ? 'Jenis Data' : 'Data Type'}
                    </th>
                    <th className="py-3.5 px-4 font-semibold">
                      {lang === 'id' ? 'Lokasi / Metode' : 'Storage / Collection'}
                    </th>
                    <th className="py-3.5 px-4 font-semibold">
                      {lang === 'id' ? 'Tujuan Penggunaan' : 'Purpose'}
                    </th>
                    <th className="py-3.5 px-4 font-semibold">
                      {lang === 'id' ? 'Kontrol Pengguna' : 'User Control'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-mono-tech text-xs">
                  <tr>
                    <td className="py-4 px-4 font-sans font-medium text-stone-900">
                      {lang === 'id'
                        ? 'Nama Tampilan & Kota Domisili'
                        : 'Display Name & City of Residence'}
                    </td>
                    <td className="py-4 px-4 text-[#14532D]">
                      {lang === 'id'
                        ? 'Lokal Saja (SharedPreferences)'
                        : 'Local Only (SharedPreferences)'}
                    </td>
                    <td className="py-4 px-4 font-sans text-stone-700">
                      {lang === 'id'
                        ? 'Personalisasi tampilan lokal & cuaca BMKG'
                        : 'Local UI personalization & BMKG weather'}
                    </td>
                    <td className="py-4 px-4 font-sans text-stone-700">
                      {lang === 'id'
                        ? 'Ubah di Aplikasi / Hapus Data'
                        : 'Edit in-app / Clear Storage'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-sans font-medium text-stone-900">
                      {lang === 'id'
                        ? 'Stasiun Favorit, Riwayat & Catatan Kalender'
                        : 'Favorites, History & Calendar Notes'}
                    </td>
                    <td className="py-4 px-4 text-[#14532D]">
                      {lang === 'id'
                        ? 'Lokal Saja (Tidak Dikirim ke Server)'
                        : 'Local Only (Never Sent to Server)'}
                    </td>
                    <td className="py-4 px-4 font-sans text-stone-700">
                      {lang === 'id'
                        ? 'Fungsi inti aplikasi bagi pendengar'
                        : 'Core app functionality for listeners'}
                    </td>
                    <td className="py-4 px-4 font-sans text-stone-700">
                      {lang === 'id'
                        ? 'Hapus item / Clear Storage / Uninstall'
                        : 'Delete item / Clear Storage / Uninstall'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-sans font-medium text-stone-900">
                      Google Advertising ID (AAID) & App Set ID
                    </td>
                    <td className="py-4 px-4 text-[#9A3412]">
                      {lang === 'id'
                        ? 'SDK Mitra Iklan Resmi (HTTPS/TLS)'
                        : 'Official Ad Partner SDKs (HTTPS/TLS)'}
                    </td>
                    <td className="py-4 px-4 font-sans text-stone-700">
                      {lang === 'id'
                        ? 'Penayangan iklan, frequency capping, analitik & fraud prevention'
                        : 'Ad serving, frequency capping, analytics & fraud prevention'}
                    </td>
                    <td className="py-4 px-4 font-sans text-stone-700">
                      {lang === 'id'
                        ? 'Pengaturan > Google > Iklan > Reset/Hapus ID'
                        : 'Settings > Google > Ads > Reset/Delete ID'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-sans font-medium text-stone-900">
                      {lang === 'id'
                        ? 'Alamat IP Sementara'
                        : 'Temporary IP Address'}
                    </td>
                    <td className="py-4 px-4 text-[#9A3412]">
                      {lang === 'id'
                        ? 'Otomatis saat Koneksi Streaming/Iklan'
                        : 'Automated during Stream/Ad Requests'}
                    </td>
                    <td className="py-4 px-4 font-sans text-stone-700">
                      {lang === 'id'
                        ? 'Perkiraan wilayah umum (negara/kota) untuk iklan relevan'
                        : 'Coarse region estimation (country/city) for relevant ads'}
                    </td>
                    <td className="py-4 px-4 font-sans text-stone-700">
                      {lang === 'id'
                        ? 'Tidak disimpan permanen (Sementara)'
                        : 'Ephemeral / Not persistently stored'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-sans font-medium text-stone-900">
                      {lang === 'id'
                        ? 'Info Teknis Perangkat, Interaksi Iklan & Crash Logs'
                        : 'Device Info, Ad Interactions & Crash Logs'}
                    </td>
                    <td className="py-4 px-4 text-[#9A3412]">
                      {lang === 'id'
                        ? 'SDK Mediasi (Unity LevelPlay, Meta, Google)'
                        : 'Mediation SDKs (Unity LevelPlay, Meta, Google)'}
                    </td>
                    <td className="py-4 px-4 font-sans text-stone-700">
                      {lang === 'id'
                        ? 'Stabilitas aplikasi, diagnostik kerusakan & performa iklan'
                        : 'App stability, crash diagnostics & ad performance'}
                    </td>
                    <td className="py-4 px-4 font-sans text-stone-700">
                      {lang === 'id'
                        ? 'Dienkripsi via HTTPS/TLS'
                        : 'Encrypted in transit via HTTPS/TLS'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* VIEW MODE 3: RAW PLAIN TEXT FOR GOOGLE PLAY / DEVELOPER COPY-PASTE */}
        {viewMode === 'raw' && (
          <section className="mt-10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-stone-500 font-mono-tech">
                  RAW DOCUMENT FORMAT · UTF-8
                </div>
                <h2 className="text-2xl font-editorial text-stone-900 mt-1">
                  {lang === 'id'
                    ? 'Naskah Teks Mentah (Siap Salin)'
                    : 'Plain Text Format (Ready to Copy)'}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleCopy(
                      lang === 'id' ? RAW_POLICY_TEXT_ID : RAW_POLICY_TEXT_EN,
                      'text'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#9A3412] rounded-md hover:bg-[#7C2D12] transition-colors cursor-pointer"
                >
                  {copiedType === 'text' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'id' ? 'Berhasil Disalin' : 'Copied to Clipboard'}</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      <span>{lang === 'id' ? 'Salin Seluruh Teks' : 'Copy Entire Text'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <pre className="p-6 bg-[#EBE6DF]/50 border border-stone-300 rounded-lg font-mono-tech text-xs text-stone-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {lang === 'id' ? RAW_POLICY_TEXT_ID : RAW_POLICY_TEXT_EN}
            </pre>
          </section>
        )}
      </main>

      {/* Quiet Institutional Footer */}
      <footer className="border-t border-stone-300 bg-[#EBE6DF]/40 px-6 lg:px-12 py-8 mt-16 no-print">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-600">
          <div className="space-y-1">
            <div className="font-semibold text-stone-900">
              {APP_METADATA.appName} (<code className="font-mono-tech">{APP_METADATA.packageName}</code>)
            </div>
            <div>
              {lang === 'id'
                ? `Hak Cipta © 2026 ${APP_METADATA.developerName}. Berlaku efektif sejak ${APP_METADATA.effectiveDate.id}.`
                : `Copyright © 2026 ${APP_METADATA.developerName}. Effective since ${APP_METADATA.effectiveDate.en}.`}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://unity.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 inline-flex items-center gap-1"
            >
              <span>Unity / ironSource</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.facebook.com/about/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 inline-flex items-center gap-1"
            >
              <span>Meta Audience Network</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 inline-flex items-center gap-1"
            >
              <span>Google Play Services</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={`mailto:${APP_METADATA.developerEmail}`}
              className="text-[#9A3412] font-medium hover:underline"
            >
              {APP_METADATA.developerEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
