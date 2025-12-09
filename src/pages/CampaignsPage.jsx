import React, { useMemo, useState } from 'react';
import {
    Search, Calendar, RefreshCw, Download,
    BarChart2, Zap, Rocket, ChevronDown, X, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUseCaseStore } from '../stores/useCaseStore';

const CampaignsPage = () => {
    const navigate = useNavigate();
    const campaigns = useUseCaseStore((state) => state.campaigns);
    const useCases = useUseCaseStore((state) => state.useCases);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Filter States
    const [selectedProduct, setSelectedProduct] = useState('All Products');
    const [selectedChannel, setSelectedChannel] = useState('All Channels');
    const [selectedDeliveryType, setSelectedDeliveryType] = useState('All Delivery Types');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    
    // Dropdown States
    const [productDropdownOpen, setProductDropdownOpen] = useState(false);
    const [channelDropdownOpen, setChannelDropdownOpen] = useState(false);
    const [deliveryDropdownOpen, setDeliveryDropdownOpen] = useState(false);

    // Available Options
    const products = ['All Products', 'Personal Loan', 'Credit Card', 'Home Loan', 'Auto Loan', 'Insurance', 'Fixed Deposit'];
    const channels = ['All Channels', 'WhatsApp', 'SMS', 'RCS'];
    const deliveryTypes = ['All Delivery Types', 'Immediate', 'Scheduled', 'Triggered'];

    const parseDate = (input) => {
        if (!input) return null;
        const parsed = new Date(input);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    };

    const formatDisplayDate = (input) => {
        const date = parseDate(input);
        if (!date) return input || '-';
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const formatBudget = (budget) => {
        if (!budget) return '-';
        if (budget.total) return `${budget.spent} / ${budget.total}`;
        return budget.spent;
    };

    // Tabs Configuration
    const activeUseCaseIds = useMemo(
        () => new Set(useCases.filter((uc) => uc.status === 'Active').map((uc) => uc.id)),
        [useCases]
    );

    const tabs = [
        { id: 'ai', label: 'AI Suggested (today)', count: campaigns.filter(c => c.isAiSuggested && activeUseCaseIds.has(c.useCaseId)).length },
        { id: 'all', label: 'All', count: campaigns.length },
        { id: 'scheduled', label: 'Scheduled', count: campaigns.filter(c => c.isScheduled).length },
        { id: 'sent', label: 'Sent', count: campaigns.filter(c => c.isSent).length },
    ];

    // Filtering Logic
    const filteredCampaigns = useMemo(() => {
        const startDate = parseDate(dateRange.start);
        const endDate = parseDate(dateRange.end);

        return campaigns.filter((campaign) => {
            if (campaign.isAiSuggested && !activeUseCaseIds.has(campaign.useCaseId)) {
                return false;
            }
            const matchesSearch =
                campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                campaign.id.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesProduct = selectedProduct === 'All Products' || campaign.product === selectedProduct;
            const matchesChannel = selectedChannel === 'All Channels' || campaign.channel === selectedChannel;
            const matchesDelivery = selectedDeliveryType === 'All Delivery Types' || campaign.deliveryType === selectedDeliveryType;

            const createdDate = parseDate(campaign.createdOn || campaign.created);
            const matchesDate =
                (!startDate || (createdDate && createdDate >= startDate)) &&
                (!endDate || (createdDate && createdDate <= endDate));

            if (!matchesSearch || !matchesProduct || !matchesChannel || !matchesDelivery || !matchesDate) return false;

            if (activeTab === 'ai') return campaign.isAiSuggested;
            if (activeTab === 'scheduled') return campaign.isScheduled;
            if (activeTab === 'sent') return campaign.isSent;

            return true;
        });
    }, [campaigns, searchQuery, selectedProduct, selectedChannel, selectedDeliveryType, dateRange, activeTab, activeUseCaseIds]);

    const clearFilters = () => {
        setSelectedProduct('All Products');
        setSelectedChannel('All Channels');
        setSelectedDeliveryType('All Delivery Types');
        setDateRange({ start: '', end: '' });
        setSearchQuery('');
    };

    const Dropdown = ({ label, options, selected, setSelected, isOpen, setIsOpen }) => (
        <div className="relative w-full md:w-auto">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap min-w-[180px]"
                aria-label={label}
            >
                <span className="truncate">{selected}</span>
                <ChevronDown size={16} className="ml-2" />
            </button>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    setSelected(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                    selected === option ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );

    const openEditor = (campaignId) => {
        navigate(`/campaigns/${campaignId}/edit`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All campaigns</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and monitor all your campaign performance</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button 
                        onClick={() => window.location.reload()}
                        className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <RefreshCw size={16} className="mr-2" />
                        Refresh
                    </button>
                    <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Download size={16} className="mr-2" />
                        Export
                    </button>
                    <button 
                        onClick={() => navigate('/campaigns/stats')}
                        className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <BarChart2 size={16} className="mr-2" />
                        Campaign Stats
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 overflow-x-auto">
                <nav className="flex space-x-8 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <span className={activeTab === tab.id && tab.id === 'ai' ? 'flex items-center' : ''}>
                                {tab.id === 'ai' && <Zap size={16} className="mr-1.5" />}
                                {tab.label}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                                activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Filters & Search */}
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                </div>
                <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
                    {/* Date Picker */}
                    <div className="flex flex-wrap items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 w-full">
                        <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            className="border-none outline-none bg-transparent text-sm min-w-[140px] flex-1"
                        />
                        <span className="text-gray-400 px-1">to</span>
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            className="border-none outline-none bg-transparent text-sm min-w-[140px] flex-1"
                        />
                    </div>

                    <Dropdown
                        label="Products"
                        options={products}
                        selected={selectedProduct}
                        setSelected={setSelectedProduct}
                        isOpen={productDropdownOpen}
                        setIsOpen={setProductDropdownOpen}
                    />

                    <Dropdown
                        label="Channels"
                        options={channels}
                        selected={selectedChannel}
                        setSelected={setSelectedChannel}
                        isOpen={channelDropdownOpen}
                        setIsOpen={setChannelDropdownOpen}
                    />

                    <Dropdown
                        label="Delivery Types"
                        options={deliveryTypes}
                        selected={selectedDeliveryType}
                        setSelected={setSelectedDeliveryType}
                        isOpen={deliveryDropdownOpen}
                        setIsOpen={setDeliveryDropdownOpen}
                    />

                    <button 
                        onClick={clearFilters}
                        className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap w-full md:w-auto"
                    >
                        <X size={16} className="mr-1" />
                        Clear filters
                    </button>
                </div>
            </div>

            <div className="text-sm text-gray-500">
                Showing latest {filteredCampaigns.length} campaigns
            </div>

            {/* Campaigns List - Responsive */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                {/* Desktop View */}
                <div className="hidden lg:block overflow-x-auto">
                    <div className="grid min-w-[1024px] grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-3">Campaign</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-1">Status</div>
                        <div className="col-span-1">Created</div>
                        <div className="col-span-2">Details</div>
                        <div className="col-span-1">Budget</div>
                        <div className="col-span-1">AI</div>
                        <div className="col-span-1 text-right">Actions</div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {filteredCampaigns.length === 0 && (
                            <div className="p-6 text-center text-gray-500">
                                No campaigns match your filters. Adjust filters or clear them to see more campaigns.
                            </div>
                        )}
                        {filteredCampaigns.map((campaign) => (
                            <div key={campaign.id} className="grid min-w-[960px] grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors items-center relative group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-l"></div>

                                <div className="col-span-3 pl-2">
                                    <h3 className="text-sm font-semibold text-gray-900 truncate" title={campaign.name}>
                                        {campaign.name}
                                    </h3>
                                    <div className="flex items-center space-x-2 mt-1 text-xs">
                                        <span className="text-gray-500">ID: {campaign.id}</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-purple-600 font-medium truncate">@ {campaign.useCaseName}</span>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <p className="text-sm text-gray-900 font-medium">{campaign.type}</p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white mt-1 ${campaign.channelColor}`}>
                                        {campaign.channel}
                                    </span>
                                    <p className="text-xs text-gray-500 mt-1">Delivery: {campaign.deliveryType}</p>
                                </div>

                                <div className="col-span-1">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        campaign.status === 'Predicted' ? 'bg-purple-100 text-purple-800' :
                                        campaign.status === 'Sent' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {campaign.status}
                                    </span>
                                </div>

                                <div className="col-span-1 text-sm text-gray-600">
                                    {formatDisplayDate(campaign.createdOn || campaign.created)}
                                </div>

                                <div className="col-span-2 text-sm text-gray-700 space-y-1">
                                    {campaign.status === 'Scheduled' && campaign.scheduleInfo ? (
                                        <>
                                            <p><span className="font-semibold text-gray-900">Scheduled:</span> {campaign.scheduleInfo.sendAt}</p>
                                            <p><span className="font-semibold text-gray-900">Recurrence:</span> {campaign.scheduleInfo.recurrence}</p>
                                            <p><span className="font-semibold text-gray-900">Template:</span> {campaign.scheduleInfo.template}</p>
                                        </>
                                    ) : campaign.status === 'Predicted' && campaign.aiSuggestion ? (
                                        <>
                                            <p><span className="font-semibold text-gray-900">Suggested:</span> {campaign.aiSuggestion.recommendedTime}</p>
                                            <p><span className="font-semibold text-gray-900">Segment:</span> {campaign.aiSuggestion.segment}</p>
                                            <p><span className="font-semibold text-gray-900">Content:</span> {campaign.aiSuggestion.content}</p>
                                        </>
                                    ) : campaign.sentDetails ? (
                                        <>
                                            <p><span className="font-semibold text-gray-900">Sent:</span> {campaign.sentDetails.sentAt}</p>
                                            <p><span className="font-semibold text-gray-900">Recipients:</span> {campaign.sentDetails.recipients.toLocaleString()}</p>
                                            <p><span className="font-semibold text-gray-900">Engagement:</span> Opens {campaign.sentDetails.opens.toLocaleString()} · Clicks {campaign.sentDetails.clicks.toLocaleString()}</p>
                                        </>
                                    ) : (
                                        <p className="text-gray-500">No additional details</p>
                                    )}
                                </div>

                                <div className="col-span-1 text-sm">
                                    <p className="text-gray-500">
                                        {campaign.status === 'Predicted' ? 'Planned' : campaign.status === 'Scheduled' ? 'Scheduled' : 'Spent'}
                                    </p>
                                    <p className="font-semibold text-gray-900">{formatBudget(campaign.budget)}</p>
                                </div>

                                <div className="col-span-1">
                                    <div className="flex items-center space-x-1">
                                        <Zap size={14} className="text-purple-600 fill-current" />
                                        <span className="text-sm font-bold text-purple-900">{campaign.aiConfidence}%</span>
                                    </div>
                                </div>

                                <div className="col-span-1 text-right">
                                    {campaign.status === 'Predicted' ? (
                                        <button
                                            onClick={() => openEditor(campaign.id)}
                                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg inline-flex items-center transition-colors"
                                        >
                                            <Rocket size={14} className="mr-1.5" />
                                            Edit &amp; Launch
                                        </button>
                                    ) : campaign.status === 'Scheduled' ? (
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => openEditor(campaign.id)}
                                                className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg inline-flex items-center justify-center transition-colors"
                                            >
                                                <Eye size={14} className="mr-1.5" />
                                                Edit schedule
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => openEditor(campaign.id)}
                                            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg inline-flex items-center transition-colors"
                                        >
                                            <Eye size={14} className="mr-1.5" />
                                            View / Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile/Tablet View */}
                <div className="lg:hidden divide-y divide-gray-100">
                    {filteredCampaigns.map((campaign) => (
                        <div key={campaign.id} className="p-4 hover:bg-gray-50 transition-colors relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                            
                            <div className="pl-2 space-y-3">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">{campaign.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1">ID: {campaign.id}</p>
                                    <p className="text-xs text-purple-600 font-medium">@ {campaign.useCaseName}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${campaign.channelColor}`}>
                                        {campaign.channel}
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        campaign.status === 'Predicted' ? 'bg-purple-100 text-purple-800' :
                                        campaign.status === 'Sent' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {campaign.status}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                        <Zap size={14} className="text-purple-600 fill-current" />
                                        <span className="text-sm font-bold text-purple-900">{campaign.aiConfidence}%</span>
                                    </div>
                                    <span className="text-xs text-gray-500">Delivery: {campaign.deliveryType}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-gray-500">Conv Rate:</span>
                                        <span className="ml-1 font-medium">{campaign.performance.convRate}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">CPA:</span>
                                        <span className="ml-1 font-medium">{campaign.performance.cpa}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Created:</span>
                                        <span className="ml-1 font-medium">{formatDisplayDate(campaign.createdOn || campaign.created)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Budget:</span>
                                        <span className="ml-1 font-medium">{formatBudget(campaign.budget)}</span>
                                    </div>
                                    {campaign.status === 'Scheduled' && campaign.scheduleInfo ? (
                                        <div className="col-span-2 text-gray-700">
                                            <span className="text-gray-500">Schedule:</span>
                                            <span className="ml-1 font-medium">{campaign.scheduleInfo.sendAt} ({campaign.scheduleInfo.recurrence})</span>
                                        </div>
                                    ) : campaign.status === 'Predicted' && campaign.aiSuggestion ? (
                                        <div className="col-span-2 text-gray-700">
                                            <span className="text-gray-500">Suggested:</span>
                                            <span className="ml-1 font-medium">{campaign.aiSuggestion.recommendedTime} · {campaign.aiSuggestion.segment}</span>
                                        </div>
                                    ) : campaign.sentDetails ? (
                                        <div className="col-span-2 text-gray-700">
                                            <span className="text-gray-500">Sent:</span>
                                            <span className="ml-1 font-medium">{campaign.sentDetails.sentAt} · Recipients {campaign.sentDetails.recipients.toLocaleString()}</span>
                                        </div>
                                    ) : null}
                                </div>

                                    {campaign.status === 'Predicted' ? (
                                        <button
                                            onClick={() => openEditor(campaign.id)}
                                            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg inline-flex items-center justify-center transition-colors"
                                        >
                                            <Rocket size={14} className="mr-1.5" />
                                            Edit &amp; Launch
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => openEditor(campaign.id)}
                                            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg inline-flex items-center justify-center transition-colors"
                                        >
                                            <Eye size={14} className="mr-1.5" />
                                            View / Edit
                                        </button>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CampaignsPage;
