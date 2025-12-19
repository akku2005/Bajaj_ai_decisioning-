import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, Filter, ChevronDown, BarChart3, AlertTriangle, ExternalLink,
    ArrowUp, ArrowDown, Minus, TrendingUp, TrendingDown, Layout, Zap,
    Target, MousePointerClick, Clock, ArrowRight
} from 'lucide-react';
import { pagesData, businessImpact } from './seoData';

// ===== FILTER OPTIONS =====
const filterOptions = {
    product: ['All', 'Personal Loan', 'Home Loan', 'Credit Card', 'Insurance'],
    funnelStage: ['All', 'Awareness', 'Consideration', 'Decision'],
    pageType: ['All', 'Product', 'Calculator', 'Blog', 'Landing'],
    trafficDrops: ['All', '>10%', '>20%', '>50%'],
    conversionDrops: ['All', '>10%', '>20%', '>50%'],
    rankingPosition: ['All', 'Top 3', 'Top 10', 'Top 20', '20+']
};

// ===== COMPONENTS =====
const ImpactCard = ({ label, value, subLabel, colorClass, icon: Icon }) => (
    <div className="bg-white border text-center border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className={`absolute top-0 left-0 w-1 h-full ${colorClass.replace('text-', 'bg-')}`}></div>
        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon size={80} />
        </div>
        <div className="relative z-10 flex flex-col items-center">
            <p className={`text-3xl font-extrabold ${colorClass} tracking-tight`}>{value}</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{label}</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">{subLabel}</p>
        </div>
    </div>
);

const FilterDropdown = ({ label, value, options, onChange }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider ml-1">{label}</label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-xs font-medium text-gray-700 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-full transition-all"
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
    </div>
);

const SEORecommendations = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        product: 'All',
        funnelStage: 'All',
        pageType: 'All',
        trafficDrops: 'All',
        conversionDrops: 'All',
        rankingPosition: 'All'
    });

    const handlePageClick = (page) => {
        navigate(`/seo/recommendations/${page.id}`);
    };

    // Filter pages
    const filteredPages = pagesData.filter(page => {
        if (searchQuery && !page.url.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (filters.product !== 'All' && page.product !== filters.product) return false;
        return true;
    });

    // Formatting helpers
    const formatChange = (val, suffix = '%') => {
        if (!val && val !== 0) return <span className="text-gray-300">-</span>;
        const isPos = val > 0;
        const isNeg = val < 0;
        const isZero = val === 0;

        return (
            <div className={`flex items-center gap-0.5 font-semibold ${isPos ? 'text-green-600' : isNeg ? 'text-red-600' : 'text-gray-400'}`}>
                {isPos && <ArrowUp size={12} strokeWidth={3} />}
                {isNeg && <ArrowDown size={12} strokeWidth={3} />}
                {isZero && <Minus size={12} />}
                <span>{Math.abs(val)}{suffix}</span>
            </div>
        );
    };

    const getCWVBadge = (status) => {
        if (!status) return <span className="text-gray-300 text-xs">-</span>;
        const styles = {
            'High': 'bg-red-50 text-red-700 border-red-100',
            'Fail': 'bg-red-50 text-red-700 border-red-100',
            'Medium': 'bg-yellow-50 text-yellow-700 border-yellow-100 text-[10px]',
            'Borderline': 'bg-yellow-50 text-yellow-700 border-yellow-100 text-[10px]',
            'Low': 'bg-green-50 text-green-700 border-green-100',
            'Pass': 'bg-green-50 text-green-700 border-green-100'
        };
        const defaultStyle = 'bg-gray-50 text-gray-600 border-gray-100';

        return (
            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${styles[status] || defaultStyle}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SEO Opportunity Engine</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        AI-driven analysis of <span className="font-semibold text-gray-900">{pagesData.length} pages</span> for ranking, traffic, and conversion gaps.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search URL..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Business Impact Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <ImpactCard
                    label="Pages Analyzed"
                    value="17,042"
                    subLabel="100% Coverage"
                    colorClass="text-gray-900"
                    icon={Layout}
                />
                <ImpactCard
                    label="Revenue at Risk"
                    value="₹56.3 Cr"
                    subLabel="monthly projection"
                    colorClass="text-red-600"
                    icon={TrendingDown}
                />
                <ImpactCard
                    label="Leads at Risk"
                    value="24,860"
                    subLabel="qualified leads"
                    colorClass="text-orange-600"
                    icon={Target}
                />
                <ImpactCard
                    label="Links Impacted"
                    value="1,284"
                    subLabel="lost authority"
                    colorClass="text-yellow-600"
                    icon={ExternalLink}
                />
                <ImpactCard
                    label="Top 10 Rankings"
                    value="312"
                    subLabel="keywords"
                    colorClass="text-green-600"
                    icon={TrendingUp}
                />
            </div>

            {/* Main Content Area */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Filters Row */}
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap gap-4 items-end">
                    <FilterDropdown label="Product" value={filters.product} options={filterOptions.product} onChange={(v) => setFilters(p => ({ ...p, product: v }))} />
                    <FilterDropdown label="Funnel Stage" value={filters.funnelStage} options={filterOptions.funnelStage} onChange={(v) => setFilters(p => ({ ...p, funnelStage: v }))} />
                    <FilterDropdown label="Traffic Trend" value={filters.trafficDrops} options={filterOptions.trafficDrops} onChange={(v) => setFilters(p => ({ ...p, trafficDrops: v }))} />
                    <FilterDropdown label="Rank Position" value={filters.rankingPosition} options={filterOptions.rankingPosition} onChange={(v) => setFilters(p => ({ ...p, rankingPosition: v }))} />

                    <div className="ml-auto">
                        <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
                            <Filter size={14} />
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Page Profile</th>
                                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Current Rank</th>
                                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Traffic Impact</th>
                                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">User Signals</th>
                                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Conversions</th>
                                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Core Web Vitals</th>
                                <th className="text-right px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPages.map((page) => (
                                <tr
                                    key={page.id}
                                    onClick={() => handlePageClick(page)}
                                    className="group hover:bg-blue-50/50 cursor-pointer transition-colors duration-150"
                                >
                                    {/* Page Profile */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-blue-600 text-sm group-hover:underline">{page.url}</span>
                                                {page.isHighPriority && (
                                                    <span className="px-1.5 py-0.5 rounded-[4px] bg-red-100 text-red-700 text-[10px] font-bold animate-pulse">
                                                        HIGH
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <span className="px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-600 text-[10px] font-medium">
                                                    {page.product}
                                                </span>
                                                <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                                                <span className="text-xs text-gray-500">{page.businessRole}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Rank */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                                                {page.rank}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 uppercase font-bold">Rank Change</span>
                                                {formatChange(page.rankChange, '')}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Traffic */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">{Math.abs(page.trafficChange)}% Shift</span>
                                            {formatChange(page.trafficChange)}
                                        </div>
                                    </td>

                                    {/* User Signals */}
                                    <td className="px-6 py-4">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs">
                                                <Clock size={14} className="text-gray-400" />
                                                <span className="font-medium text-gray-700">{page.timeOnPage}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <MousePointerClick size={14} className="text-gray-400" />
                                                <span className={`font-medium ${page.scrollDepth < -20 ? 'text-red-600' : 'text-gray-700'}`}>
                                                    {Math.abs(page.scrollDepth)}% scroll
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Conversions */}
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-center w-24">
                                                <span className="text-xs text-gray-500">Leads</span>
                                                {formatChange(page.leadsChange)}
                                            </div>
                                            <div className="flex justify-between items-center w-24">
                                                <span className="text-xs text-gray-500">AIP</span>
                                                {formatChange(page.aipChange)}
                                            </div>
                                        </div>
                                    </td>

                                    {/* CWV */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-1.5 rounded-full ${page.cwvStatus === 'Pass' || !page.cwvStatus ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                <Zap size={14} fill="currentColor" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-semibold text-gray-900">{page.cwv}</span>
                                                {getCWVBadge(page.cwvStatus)}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                            <ArrowRight size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                    <p className="text-xs text-gray-500">Showing <span className="font-medium">{filteredPages.length}</span> high priority pages with identified gaps</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50">Previous</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded shadow-sm">1</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50">2</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50">3</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SEORecommendations;
