import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import aiAvatar from '../assets/ai_orb_icon.jpg';

// Enhanced Fuzzy matching to catch natural language phrases
const fuzzyMatch = (input, keywords) => {
  const lowerInput = input.toLowerCase();
  // Check for multi-word phrase matches first
  const hasPhraseMatch = keywords.some(keyword => {
    if (keyword.includes(' ')) {
      return lowerInput.includes(keyword);
    }
    return false;
  });
  if (hasPhraseMatch) return true;

  // Then check individual keywords
  return keywords.some(keyword => {
    if (keyword.includes(' ')) return false; // Handled above
    return lowerInput.includes(keyword);
  });
};

// Comprehensive demo data structure
const createDemoData = () => ({
  company: 'Funeral Services Operations',
  week: { start: '2026-08-11', end: '2026-08-17' },
  month: 'August 2026',

  // Funeral Plans (5 tiers)
  plans: {
    'Supreme Cover': {
      tier: 'Premium',
      monthly_cost: 'R450,000',
      cases_this_month: 8,
      customer_satisfaction: 9.8,
      revenue_contribution: 'R320,000',
      popular_addons: ['Catering (5/8)', 'Flowers (6/8)', 'Full Decoration (7/8)'],
      margin: '42%'
    },
    'Ultimate Cover': {
      tier: 'Premium',
      monthly_cost: 'R30,000',
      cases_this_month: 12,
      customer_satisfaction: 9.6,
      revenue_contribution: 'R245,000',
      popular_addons: ['Catering (8/12)', 'Flowers (9/12)'],
      margin: '38%'
    },
    'Optimum Cover': {
      tier: 'Mid',
      monthly_cost: 'R20,000',
      cases_this_month: 16,
      customer_satisfaction: 9.2,
      revenue_contribution: 'R180,000',
      popular_addons: ['Flowers (10/16)', 'Catering (6/16)'],
      margin: '35%'
    },
    'Standard Cover': {
      tier: 'Mid',
      monthly_cost: 'R15,000',
      cases_this_month: 14,
      customer_satisfaction: 8.9,
      revenue_contribution: '130,000',
      popular_addons: ['Flowers (7/14)'],
      margin: '30%'
    },
    'Basic Cover': {
      tier: 'Budget',
      monthly_cost: 'R10,000',
      cases_this_month: 10,
      customer_satisfaction: 8.5,
      revenue_contribution: 'R65,000',
      popular_addons: [],
      margin: '22%'
    }
  },

  // Add-on Services
  addons: {
    'Catering': {
      cases_using: 29,
      total_cases: 60,
      uptake_rate: '48%',
      avg_revenue_per_case: 'R2,500',
      total_revenue: 'R72,500',
      customer_satisfaction: 9.4
    },
    'Flowers & Decorations': {
      cases_using: 39,
      total_cases: 60,
      uptake_rate: '65%',
      avg_revenue_per_case: 'R1,800',
      total_revenue: 'R70,200',
      customer_satisfaction: 9.5
    }
  },

  // Staff Performance
  staff: {
    total_team: 8,
    active_this_week: 7,
    cases_handled: 18,
    avg_time_to_completion: '5.2 days',
    top_performer: 'Thabo Molefe (6 cases)',
    utilization_rate: '72%',
    peak_capacity: '25 cases/week',
    available_capacity: '7 cases (28%)',
    can_handle_more: true,
    avg_satisfaction_score: 9.1
  },

  // Operational Status
  facilities: [
    { name: 'Main Mortuary', deceased: 8, claimed: 6, unclaimed: 2, capacity_used: '64%' },
    { name: 'Secondary Mortuary', deceased: 5, claimed: 3, unclaimed: 2, capacity_used: '42%' },
    { name: 'Branch Facility', deceased: 3, claimed: 2, unclaimed: 1, capacity_used: '30%' }
  ],

  // Case Management
  claims: {
    total_cases: 60,
    completed_this_month: 52,
    on_time_completion: '87%',
    overdue_count: 3,
    pending_scheduling: 5,
    cleansing_scheduled: 54,
    delivery_pending: 3,
    service_pending: 4,
    avg_days_to_completion: 5.2
  },

  // Weekend/Weekly Status
  weekend: {
    services_scheduled: 8,
    tents_needed: 8,
    tents_available: 6,
    shortage_alert: true,
    shortage_details: '2 home tents in repairs',
    expected_revenue: 'R68,000',
    staff_allocated: 6,
    staff_available: 7
  },

  // Inventory/Stock
  stock: {
    low_items: ['Home Tents (2 in repair)', 'Premium Caskets'],
    adequate_items: ['Standard Caskets', 'Tables', 'Chairs', 'Standard Toilets'],
    reorder_needed: ['Home Tents urgently'],
    last_restocked: '2026-08-08'
  },

  // Customer Satisfaction
  satisfaction: {
    overall_rating: 9.2,
    by_plan: {
      'Supreme Cover': 9.8,
      'Ultimate Cover': 9.6,
      'Optimum Cover': 9.2,
      'Standard Cover': 8.9,
      'Basic Cover': 8.5
    },
    positive_feedback: ['Timely service', 'Professional staff', 'Respectful handling'],
    areas_for_improvement: ['Faster scheduling', 'More add-on options'],
    nps_score: 72
  },

  // Demand Forecast (Next 30 days)
  forecast: {
    week_1: { expected_cases: 15, utilization: '60%', critical_weeks: false },
    week_2: { expected_cases: 18, utilization: '72%', critical_weeks: false },
    week_3: { expected_cases: 22, utilization: '88%', critical_weeks: true },
    week_4: { expected_cases: 19, utilization: '76%', critical_weeks: false },
    total_expected: 74,
    peak_week: 'Week 3 (Aug 25-31)',
    staffing_recommendation: 'Hire 1 temp staff for week 3'
  },

  // Financial
  revenue: {
    this_month_projected: 'R920,000',
    from_plans: 'R750,000',
    from_addons: 'R142,700',
    from_other_services: 'R27,300',
    profit_margin: '35%',
    best_performing_plan: 'Supreme Cover',
    upsell_opportunity: 'R45,000 (untapped catering/flowers revenue)'
  },

  // Fleet
  fleet: {
    hearses_needed: 4,
    hearses_available: 5,
    family_cars_needed: 5,
    family_cars_available: 6,
    drivers_on_duty: 5,
    drivers: ['Sibusiso', 'Kagiso', 'Tebogo', 'Mandla', 'Tshepo'],
    utilization: '67%',
    vehicles: [
      {
        name: 'Tholo 1 FS',
        type: 'Hearse',
        reg: 'THOLO 1 FS',
        driver: 'Sibusiso',
        status: 'Operational',
        last_service: '2026-08-01',
        next_service: '2026-09-01',
        mileage: '187,450 km'
      },
      {
        name: 'Tholo 2 FS',
        type: 'Hearse',
        reg: 'THOLO 2 FS',
        driver: 'Kagiso',
        status: 'Operational',
        last_service: '2026-07-28',
        next_service: '2026-08-28',
        mileage: '165,230 km'
      },
      {
        name: 'Tholo 3 FS',
        type: 'Family Car',
        reg: 'THOLO 3 FS',
        driver: 'Tebogo',
        status: 'Operational',
        last_service: '2026-08-05',
        next_service: '2026-09-05',
        mileage: '142,100 km'
      },
      {
        name: 'Tholo 4 FS',
        type: 'Family Car',
        reg: 'THOLO 4 FS',
        driver: 'Mandla',
        status: 'Operational',
        last_service: '2026-07-30',
        next_service: '2026-08-30',
        mileage: '156,780 km'
      },
      {
        name: 'Tholo 5 FS',
        type: 'Family Car',
        reg: 'THOLO 5 FS',
        driver: 'Thabo',
        status: 'Operational',
        last_service: '2026-08-03',
        next_service: '2026-09-03',
        mileage: '138,560 km'
      }
    ]
  }
});

// Report generators with conversational phrasing added
const generateWeeklyReport = (data) => {
  const totalDeceased = data.facilities.reduce((sum, f) => sum + f.deceased, 0);
  const totalClaimed = data.claims.completed_this_month;

  return `Here is a comprehensive overview of our operations for the current week. 

WEEKLY OPERATIONS REPORT (${data.week.start} to ${data.week.end})

MORTUARY STATUS:
• Total Deceased: ${totalDeceased} across ${data.facilities.length} facilities
• Claimed Cases: ${totalClaimed}
• Completion Rate: ${data.claims.on_time_completion}% on time
${data.facilities.map(f => `  • ${f.name}: ${f.deceased} deceased (${f.claimed} claimed, ${f.unclaimed} unclaimed) - ${f.capacity_used} capacity`).join('\n')}

CASE MANAGEMENT:
• Cases Completed: ${data.claims.completed_this_month} this month
• On-Time Delivery: ${data.claims.on_time_completion}%
• Overdue Cases: ${data.claims.overdue_count}
• Average Completion Time: ${data.claims.avg_days_to_completion} days

PLAN PERFORMANCE:
• Supreme Cover: ${data.plans['Supreme Cover'].cases_this_month} cases (Satisfaction: ${data.plans['Supreme Cover'].customer_satisfaction}/10)
• Ultimate Cover: ${data.plans['Ultimate Cover'].cases_this_month} cases (Satisfaction: ${data.plans['Ultimate Cover'].customer_satisfaction}/10)
• Optimum Cover: ${data.plans['Optimum Cover'].cases_this_month} cases (Satisfaction: ${data.plans['Optimum Cover'].customer_satisfaction}/10)
• Standard Cover: ${data.plans['Standard Cover'].cases_this_month} cases (Satisfaction: ${data.plans['Standard Cover'].customer_satisfaction}/10)
• Basic Cover: ${data.plans['Basic Cover'].cases_this_month} cases (Satisfaction: ${data.plans['Basic Cover'].customer_satisfaction}/10)

WEEKEND FORECAST (Aug 15-17):
• Services Scheduled: ${data.weekend.services_scheduled}
• Expected Revenue: ${data.weekend.expected_revenue}
• Staff Allocated: ${data.weekend.staff_allocated}/${data.weekend.staff_available}

CRITICAL ALERTS:
${data.weekend.shortage_alert ? `• INVENTORY SHORTAGE: ${data.weekend.shortage_details}` : '• Inventory adequate'}
• ${data.claims.overdue_count} cases overdue in scheduling
• Capacity Utilization: ${Math.round((data.claims.total_cases / data.staff.peak_capacity) * 100)}%

ACTION ITEMS:
1. Resolve tent shortage before weekend
2. Contact families on ${data.claims.overdue_count} overdue cases
3. Prepare for Week 3 surge (${data.forecast.week_3.expected_cases} expected cases)
4. Review add-on upsell opportunities`;
};

const generatePlanPerformance = (data) => {
  return `I have analyzed our plan performance for this month. The premium tiers continue to drive our strongest margins. Here is the breakdown:

PLAN PERFORMANCE ANALYSIS

REVENUE BREAKDOWN (This Month):
${Object.entries(data.plans).map(([name, plan]) =>
    `${name}:
  • Cases: ${plan.cases_this_month}
  • Revenue: ${plan.revenue_contribution}
  • Satisfaction: ${plan.customer_satisfaction}/10
  • Margin: ${plan.margin}
  • Popular Add-ons: ${plan.popular_addons.length > 0 ? plan.popular_addons.join(', ') : 'None'}`
  ).join('\n\n')}

TOTAL PLAN REVENUE: R920,000

TOP PERFORMING PLAN:
Supreme Cover - Highest satisfaction (${data.plans['Supreme Cover'].customer_satisfaction}/10) & strong margins (${data.plans['Supreme Cover'].margin})

GROWTH OPPORTUNITY:
Ultimate & Optimum covers have highest volume (${data.plans['Ultimate Cover'].cases_this_month + data.plans['Optimum Cover'].cases_this_month} combined cases)
→ Focus marketing here for sustainable growth

RECOMMENDATION:
Premium tier (Supreme + Ultimate) = 20 cases, 82% satisfaction
Mid tier = 30 cases, 91% satisfaction  
Budget tier = 10 cases, 85% satisfaction
→ Expand mid-tier marketing (best balance of volume & satisfaction)`;
};

const generateRevenueOpportunity = (data) => {
  return `Based on our current add-on utilization, there is a significant opportunity to increase revenue through strategic upselling. 

REVENUE OPPORTUNITY ANALYSIS

CURRENT ADD-ON PERFORMANCE:

Catering:
• Uptake Rate: ${data.addons.Catering.uptake_rate} (${data.addons.Catering.cases_using}/${data.addons.Catering.total_cases} cases)
• Revenue per Case: ${data.addons.Catering.avg_revenue_per_case}
• Total Monthly Revenue: ${data.addons.Catering.total_revenue}
• Customer Satisfaction: ${data.addons.Catering.customer_satisfaction}/10
• OPPORTUNITY: ${(data.addons.Catering.total_cases - data.addons.Catering.cases_using)} untapped cases

Flowers & Decorations:
• Uptake Rate: ${data.addons['Flowers & Decorations'].uptake_rate} (${data.addons['Flowers & Decorations'].cases_using}/${data.addons['Flowers & Decorations'].total_cases} cases)
• Revenue per Case: ${data.addons['Flowers & Decorations'].avg_revenue_per_case}
• Total Monthly Revenue: ${data.addons['Flowers & Decorations'].total_revenue}
• Customer Satisfaction: ${data.addons['Flowers & Decorations'].customer_satisfaction}/10
• OPPORTUNITY: ${(data.addons['Flowers & Decorations'].total_cases - data.addons['Flowers & Decorations'].cases_using)} untapped cases

UNTAPPED REVENUE:
• Catering potential: ${(data.addons.Catering.total_cases - data.addons.Catering.cases_using) * 2500} (at R2,500/case)
• Flowers potential: ${(data.addons['Flowers & Decorations'].total_cases - data.addons['Flowers & Decorations'].cases_using) * 1800} (at R1,800/case)
• TOTAL UPSELL OPPORTUNITY: R45,000 this month!

ACTION PLAN:
1. Target Supreme/Ultimate cases for catering (highest satisfaction)
2. Bundle flowers package with mid-tier plans
3. Train staff on add-on recommendations
4. Create tiered packages (Basic, Standard, Premium flowers)
5. Measure uptake weekly`;
};

const generateStaffUtilization = (data) => {
  return `Our team is currently operating efficiently, but we are approaching our peak capacity thresholds. Here is the staff utilization report:

STAFF UTILIZATION & CAPACITY ANALYSIS

CURRENT STATUS:
• Team Size: ${data.staff.total_team}
• Active This Week: ${data.staff.active_this_week}
• Cases Handled: ${data.staff.cases_handled}
• Utilization Rate: ${data.staff.utilization_rate}
• Top Performer: ${data.staff.top_performer}
• Average Satisfaction: ${data.staff.avg_satisfaction_score}/10

CAPACITY ANALYSIS:
• Peak Capacity: ${data.staff.peak_capacity} cases/week
• Current Load: ${data.staff.cases_handled} cases (${Math.round((data.staff.cases_handled / data.staff.peak_capacity) * 100)}%)
• Available Capacity: ${data.staff.available_capacity}
• Status: ${data.staff.can_handle_more ? 'CAN HANDLE MORE' : 'AT CAPACITY'}

WORKLOAD DISTRIBUTION:
• Average cases per staff: ${Math.round(data.staff.cases_handled / data.staff.active_this_week)} cases
• Processing time per case: ${data.staff.avg_time_to_completion}
• No critical bottlenecks identified

FORECAST IMPACT:
• Week 3 demand: ${data.forecast.week_3.expected_cases} cases (${data.forecast.week_3.utilization} utilization)
• Status: CRITICAL - Will exceed capacity
• Recommendation: ${data.forecast.staffing_recommendation}

RECOMMENDATION:
• Hire 1 temporary staff for Week 3
• Cross-train 2 staff on advanced case management
• Implement workload balancing
• Current team can sustain ${data.staff.peak_capacity} cases/week`;
};

const generateOnTimeDelivery = (data) => {
  return `I've analyzed our delivery pipeline. We are currently meeting our targets, but there are a few bottlenecks in scheduling that require attention.

ON-TIME DELIVERY & COMPLETION ANALYSIS

CURRENT PERFORMANCE:
• On-Time Completion Rate: ${data.claims.on_time_completion}%
• Total Cases This Month: ${data.claims.total_cases}
• Completed On Time: ${Math.round(data.claims.total_cases * 0.87)}
• Overdue Cases: ${data.claims.overdue_count}
• Average Completion Time: ${data.claims.avg_days_to_completion} days

CASE STAGE ANALYSIS:
• Cleansing Scheduled: ${data.claims.cleansing_scheduled}/${data.claims.total_cases}
• Delivery Pending: ${data.claims.delivery_pending} cases (ACTION NEEDED)
• Service Pending: ${data.claims.service_pending} cases (ACTION NEEDED)
• Total Pending Final Steps: ${data.claims.delivery_pending + data.claims.service_pending}

BOTTLENECK IDENTIFICATION:
PROBLEM AREA: Delivery scheduling (${data.claims.delivery_pending} cases delayed)
  → Root cause: Family confirmation delays
  → Action: Implement automated family contact system
  → Expected improvement: +15% on-time rate

SATISFACTION CORRELATION:
• Cases completed on time: 9.4/10 satisfaction
• Cases delayed: 7.2/10 satisfaction
• Impact: On-time delivery = 2.2 point satisfaction boost

RECOMMENDATIONS:
1. Follow up on ${data.claims.delivery_pending} overdue deliveries immediately
2. Set automatic reminders at Day 3 for family confirmations
3. Provide delivery time options within 24 hours of cleansing
4. Target: Achieve 95% on-time delivery by month-end`;
};

const generateCustomerSatisfaction = (data) => {
  return `Customer satisfaction remains an industry-leading strength for us. Our NPS score is very healthy, particularly in the premium tiers. 

CUSTOMER SATISFACTION ANALYSIS

OVERALL RATING: ${data.satisfaction.overall_rating}/10
NPS Score: ${data.satisfaction.nps_score} (Strong - Industry leading)

SATISFACTION BY PLAN:
${Object.entries(data.satisfaction.by_plan).map(([plan, rating]) =>
    `• ${plan}: ${rating}/10`
  ).join('\n')}

POSITIVE FEEDBACK THEMES:
${data.satisfaction.positive_feedback.map(f => `• ${f}`).join('\n')}

AREAS FOR IMPROVEMENT:
${data.satisfaction.areas_for_improvement.map(a => `• ${a}`).join('\n')}

CORRELATION WITH ADD-ONS:
• Cases with catering: 9.4/10 satisfaction
• Cases with flowers: 9.5/10 satisfaction  
• Cases with both: 9.6/10 satisfaction
→ Add-ons significantly boost satisfaction!

PLAN-BASED INSIGHTS:
• Premium plans (Supreme/Ultimate): Expect 9.6+/10 ratings
• Mid-tier plans: 8.9-9.2/10 (good value perception)
• Budget plans: 8.5/10 (still strong, but room for improvement)

ACTION PLAN:
1. Train staff on Supreme Cover service standards
2. Implement catering for Budget cover cases (satisfaction boost)
3. Create "satisfaction guarantee" for Standard/Basic plans
4. Monthly satisfaction surveys by plan tier
5. Share positive feedback with team (recognition)`;
};

const generateDemandForecast = (data) => {
  return `Looking ahead at the next 30 days, we anticipate a significant surge in Week 3 that will push our operational capacity. 

30-DAY DEMAND FORECAST

CASE PROJECTIONS:
• Week 1 (Aug 11-17): ${data.forecast.week_1.expected_cases} cases - ${data.forecast.week_1.utilization} capacity utilization
• Week 2 (Aug 18-24): ${data.forecast.week_2.expected_cases} cases - ${data.forecast.week_2.utilization} capacity utilization
• Week 3 (Aug 25-31): ${data.forecast.week_3.expected_cases} cases - ${data.forecast.week_3.utilization} capacity utilization (CRITICAL)
• Week 4 (Sep 1-7): ${data.forecast.week_4.expected_cases} cases - ${data.forecast.week_4.utilization} capacity utilization

TOTAL EXPECTED: ${data.forecast.total_expected} cases

PEAK WEEK ALERT:
${data.forecast.peak_week} will be extremely busy!
• Expected cases: ${data.forecast.week_3.expected_cases}
• Capacity: ${Math.round((data.forecast.week_3.expected_cases / data.staff.peak_capacity) * 100)}% utilization
• Status: ${data.forecast.week_3.critical_weeks ? 'CRITICAL - EXCEEDS CAPACITY' : 'MANAGEABLE'}

RESOURCE PLANNING:
• Current staff peak capacity: ${data.staff.peak_capacity} cases/week
• Week 3 demand: ${data.forecast.week_3.expected_cases} cases
• Shortfall: ${data.forecast.week_3.expected_cases - data.staff.peak_capacity} cases
• Recommendation: ${data.forecast.staffing_recommendation}

REVENUE PROJECTION:
• Expected monthly revenue: ${data.revenue.this_month_projected}
• With add-on increases: +R${data.revenue.upsell_opportunity}
• Revised projection: ~R965,000

STRATEGIC RECOMMENDATIONS:
1. Begin temp staff recruitment NOW (before Week 3)
2. Increase catering/flowers marketing (add-on revenue)
3. Pre-book premium plans for Week 3
4. Prepare facility capacity (ensure both mortuaries staffed)
5. Alert all teams about peak period
6. Plan overtime budget for Week 3`;
};

const generateStrategicRecommendations = (data) => {
  return `Based on our operational data, financial metrics and demand forecasting, here is my strategic roadmap for the company:

STRATEGIC RECOMMENDATIONS

IMMEDIATE (This Week):
1. Resolve inventory shortage → Arrange tent repairs/rentals
2. Follow up on ${data.claims.overdue_count} overdue cases → Family contact
3. Prepare weekend operations → ${data.weekend.services_scheduled} services scheduled
4. Review on-time delivery progress → Currently at ${data.claims.on_time_completion}%

SHORT-TERM (Next 2 Weeks):
1. Hire temporary staff for Week 3 surge (${data.forecast.week_3.expected_cases} expected cases)
2. Launch catering upsell campaign → ${data.addons.Catering.total_cases - data.addons.Catering.cases_using} untapped opportunities
3. Implement automated family confirmations → Speed up delivery scheduling
4. Cross-train staff on premium service standards → Maintain 9.6+ satisfaction

MEDIUM-TERM (Next Month):
1. Expand add-on offerings → Create flowers/catering tiers
2. Optimize pricing by plan tier → Premium plans have higher satisfaction
3. Implement NPS tracking system → Current score: ${data.satisfaction.nps_score} (maintain/improve)
4. Upgrade inventory → Add 3 home tents, 5 premium caskets

LONG-TERM (Q3-Q4):
1. Plan for peak season capacity → August-September surge expected
2. Develop premium service packages → Bundle catering + flowers for Supreme plans
3. Implement staff retention program → Top performer retention critical
4. Build add-on revenue stream → Currently R142,700/month - can reach R200,000+

REVENUE IMPACT:
• Current monthly: ${data.revenue.this_month_projected}
• With recommendations: ~R1,050,000 (+14% growth)
• Key driver: Add-on optimization + capacity increase

KEY METRICS TO MONITOR:
1. On-time delivery % (Target: 95%)
2. Add-on uptake rate (Target: Catering 65%, Flowers 80%)
3. Customer satisfaction (Target: 9.5/10)
4. Staff utilization (Target: 80-85%)
5. Monthly revenue (Target: R1,000,000+)`;
};

// Enterprise Telemetry & Status Badges
const renderStatusBadges = (content) => {
  if (typeof content !== 'string') return content;

  // Patterns to look for
  const alertKeywords = [
    { regex: /\b(SHORTAGE!|INVENTORY SHORTAGE|CRITICAL|OVERDUE|DELAYED)\b/g, color: '#f87171', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.35)' },
    { regex: /\b(ACTION NEEDED|ACTION REQUIRED|AT CAPACITY|WARNING|SHORTAGE)\b/g, color: '#fbbf24', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.35)' },
    { regex: /\b(OK|OPERATIONAL|CAN HANDLE MORE|STRONG|HEALTHY|COMPLETED ON TIME)\b/g, color: '#34d399', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.35)' },
    { regex: /\b(SCHEDULED|PENDING|IN REPAIR)\b/g, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' }
  ];

  // We can render inline badges
  let parts = [content];
  alertKeywords.forEach(({ regex, color, bg, border }) => {
    const newParts = [];
    parts.forEach(part => {
      if (typeof part !== 'string') {
        newParts.push(part);
        return;
      }
      const matches = [...part.matchAll(regex)];
      if (matches.length === 0) {
        newParts.push(part);
        return;
      }
      let lastIndex = 0;
      matches.forEach((m, idx) => {
        if (m.index > lastIndex) {
          newParts.push(part.substring(lastIndex, m.index));
        }
        newParts.push(
          <span key={`${m[0]}-${idx}-${lastIndex}`} style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 7px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.6px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            borderRadius: '4px',
            color: color,
            backgroundColor: bg,
            border: `1px solid ${border}`,
            margin: '0 4px',
            lineHeight: 1.2
          }}>
            [{m[0]}]
          </span>
        );
        lastIndex = m.index + m[0].length;
      });
      if (lastIndex < part.length) {
        newParts.push(part.substring(lastIndex));
      }
    });
    parts = newParts;
  });

  return parts;
};

// Architecture Telemetry Formatter
const formatMessageText = (text) => {
  if (!text) return null;

  const lines = text.split('\n');
  return lines.map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={index} style={{ height: '8px' }} />;

    // Main Section Headers (All caps or ending in colon)
    if (/^[A-Z\s&]{4,}:?$/.test(trimmed) || (trimmed.toUpperCase() === trimmed && trimmed.length > 5 && !trimmed.includes('•') && !trimmed.includes('-'))) {
      const headerTitle = trimmed.replace(/:$/, '');
      return (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: index === 0 ? '4px 0 14px 0' : '22px 0 12px 0',
          paddingBottom: '6px',
          borderBottom: '1px solid rgba(51, 65, 85, 0.5)'
        }}>
          <span style={{
            width: '4px',
            height: '14px',
            borderRadius: '2px',
            backgroundColor: '#38bdf8'
          }} />
          <h4 style={{
            margin: 0,
            color: '#f8fafc',
            fontWeight: '700',
            fontSize: '13.5px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            {headerTitle}
          </h4>
        </div>
      );
    }

    // Numbered Priority / Action Recommendations (e.g., 1. Resolve tent shortage...)
    const priorityMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (priorityMatch) {
      const priorityNum = priorityMatch[1];
      const actionContent = priorityMatch[2];
      return (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '10px 14px',
          marginBottom: '8px',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(51, 65, 85, 0.6)',
          borderRadius: '8px'
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: '700',
            fontFamily: 'ui-monospace, monospace',
            color: priorityNum === '1' ? '#f87171' : priorityNum === '2' ? '#fbbf24' : '#38bdf8',
            backgroundColor: priorityNum === '1' ? 'rgba(239, 68, 68, 0.15)' : priorityNum === '2' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(56, 189, 248, 0.15)',
            border: `1px solid ${priorityNum === '1' ? 'rgba(239, 68, 68, 0.35)' : priorityNum === '2' ? 'rgba(245, 158, 11, 0.35)' : 'rgba(56, 189, 248, 0.35)'}`,
            padding: '2px 8px',
            borderRadius: '4px',
            flexShrink: 0
          }}>
            Priority {priorityNum}
          </span>
          <div style={{ color: '#cbd5e1', fontSize: '13.5px', lineHeight: '1.5', flex: 1 }}>
            {renderStatusBadges(actionContent)}
          </div>
        </div>
      );
    }

    // Bullet points with Key-Value or Telemetry Line
    if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      const content = trimmed.substring(1).trim();
      let innerNode;

      if (content.includes(':')) {
        const colonIndex = content.indexOf(':');
        const key = content.substring(0, colonIndex).trim();
        const value = content.substring(colonIndex + 1).trim();

        innerNode = (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px', width: '100%' }}>
            <span style={{ color: '#94a3b8', fontWeight: '500', fontSize: '13px' }}>
              {key}:
            </span>
            <span style={{ color: '#f8fafc', fontWeight: '600', fontSize: '13.5px' }}>
              {renderStatusBadges(value)}
            </span>
          </div>
        );
      } else {
        innerNode = (
          <span style={{ color: '#cbd5e1', fontSize: '13.5px', lineHeight: '1.5' }}>
            {renderStatusBadges(content)}
          </span>
        );
      }

      return (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          padding: '4px 0 4px 8px',
          marginBottom: '4px',
          borderLeft: '2px solid rgba(56, 189, 248, 0.3)'
        }}>
          {innerNode}
        </div>
      );
    }

    // Key-Value without bullet (e.g., "Registration: THOLO 1 FS")
    if (trimmed.includes(':') && !trimmed.startsWith('http')) {
      const colonIndex = trimmed.indexOf(':');
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();

      return (
        <div key={index} style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: '8px',
          padding: '3px 0',
          marginBottom: '4px'
        }}>
          <span style={{ color: '#94a3b8', fontWeight: '500', fontSize: '13px' }}>
            {key}:
          </span>
          <span style={{ color: '#f8fafc', fontSize: '13.5px' }}>
            {renderStatusBadges(value)}
          </span>
        </div>
      );
    }

    // Standard Text
    return (
      <div key={index} style={{
        marginBottom: '10px',
        color: '#cbd5e1',
        fontSize: '14px',
        lineHeight: '1.6'
      }}>
        {renderStatusBadges(trimmed)}
      </div>
    );
  });
};

export default function FuneralOpsDemo() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: "Welcome to the Funeral Operations & Business Intelligence Hub.\n\nI am your operational assistant, synchronized with branch facilities, fleet tracking, and case management systems.\n\nAREAS I CAN ASSIST YOU WITH:\n• Mortuary Occupancy & Deceased Logistics (3 Facilities)\n• Fleet Availability & Driver Schedules (Hearses & Family Cars)\n• Arrangements & Claims Workflow (87% On-Time Completion)\n• Weekend Capacity & Equipment Shortage Alerts\n• Stock & Equipment Inventory Monitoring\n• Funeral Plan Performance & Margin Analysis\n• 30-Day Demand Forecasting & Staffing Surge Planning\n\nClick any quick question below or type what you need in the search box to get started.",
      timestamp: new Date()
    }
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState(null); // 'vanessa' or 'demo'
  const [demoData, setDemoData] = useState(null);
  const [activeDomain, setActiveDomain] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const messagesContainerRef = useRef(null);

  const authKeywords = ["reuben", "test victory", "doing the right things right"];

  // Sanitize data for Vanessa (remove specific client references)
  const sanitizeForVanessa = (text) => {
    if (authMode !== 'vanessa') return text;

    return text
      .replace(/Thlolo Victory/g, 'Funeral Service')
      .replace(/Tlholo Victory/g, 'Funeral Service')
      .replace(/THLOLO VICTORY/g, 'FUNERAL SERVICE')
      .replace(/Tholo 1 FS/g, 'Fleet Unit 1')
      .replace(/Tholo 2 FS/g, 'Fleet Unit 2')
      .replace(/Tholo 3 FS/g, 'Fleet Unit 3')
      .replace(/Tholo 4 FS/g, 'Fleet Unit 4')
      .replace(/Tholo 5 FS/g, 'Fleet Unit 5')
      .replace(/THOLO 1 FS/g, 'VEH-001-ZA')
      .replace(/THOLO 2 FS/g, 'VEH-002-ZA')
      .replace(/THOLO 3 FS/g, 'VEH-003-ZA')
      .replace(/THOLO 4 FS/g, 'VEH-004-ZA')
      .replace(/THOLO 5 FS/g, 'VEH-005-ZA')
      .replace(/Qwaqwa Branch/g, 'Branch A')
      .replace(/Bethlehem Branch/g, 'Branch B')
      .replace(/Reitz Branch/g, 'Branch C')
      .replace(/Qwaqwa/g, 'Branch A')
      .replace(/Bethlehem/g, 'Branch B')
      .replace(/Reitz/g, 'Branch C')
      .replace(/Mpumalanga/g, 'Branch D')
      .replace(/Sibusiso/g, 'Driver 1')
      .replace(/Kagiso/g, 'Driver 2')
      .replace(/Tebogo/g, 'Driver 3')
      .replace(/Mandla/g, 'Driver 4')
      .replace(/Thabo/g, 'Driver 5')
      .replace(/Qwaqwa Mortuary/g, 'Primary Mortuary')
      .replace(/BHM Mortuary/g, 'Secondary Mortuary')
      .replace(/Branch Facility/g, 'Tertiary Facility')
      .replace(/Main Mortuary/g, 'Primary Mortuary')
      .replace(/Secondary Mortuary/g, 'Secondary Mortuary')
      .replace(/Primary Mortuary/g, 'Primary Mortuary')
      .replace(/Head Office/g, 'Head Office')
      .replace(/THS-/g, 'CASE-');
  };

  // Only scroll the internal feed container, NEVER the whole page
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleAsk = (e) => {
    if (e) e.preventDefault();
    if (!question.trim()) return;

    const currentQ = question;
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: currentQ, timestamp: new Date() }]);
    setQuestion('');
    setLoading(true);

    setTimeout(() => {
      let responseText = '';
      const lowerQ = currentQ.toLowerCase();
      const data = demoData || createDemoData();

      // Authentication flow
      if (!isAuthenticated) {
        if (lowerQ.includes('vanessa')) {
          setIsAuthenticated(true);
          setAuthMode('vanessa');
          setDemoData(data);
          responseText = `Welcome! You are now viewing the Confidential Evaluation Mode (Vanessa Protocol).\n\nAll client names, vehicle registrations, and branch locations have been generalized for client confidentiality.\n\nCURRENT STATUS: Online & Ready\nDATASET: Representative South African Funeral Operations Profile\n\nPOPULAR QUESTIONS TO EXPLORE:\n• Mortuary Occupancy & Facilities Status\n• Fleet Units & Driver Availability\n• Claims & Arrangement Progress\n• Weekend Schedule & Equipment Check\n• Plan Margins & Add-on Revenue Opportunities\n• 30-Day Demand Forecast\n\nClick any topic below or ask your question directly.`;
        } else if (authKeywords.some(k => lowerQ.includes(k)) || lowerQ.includes('start demo') || lowerQ.includes('demo')) {
          setIsAuthenticated(true);
          setAuthMode('demo');
          setDemoData(data);
          responseText = `Welcome! Full operational dataset loaded for Funeral Operations.\n\nSYNCHRONIZED SYSTEMS:\n• 3 Mortuary Facilities (Qwaqwa, Bethlehem, Reitz)\n• 5 Fleet Vehicles (Hearses & Family Cars with active drivers)\n• 60 Active Monthly Client Cases\n• Revenue Projections & Financial Margins\n• 8-Person Operational Workforce\n\nYou can now ask about mortuary capacity, fleet readiness, weekend scheduling, or financial performance.`;
        } else {
          responseText = `Welcome to the Funeral Operations Assistant!\n\nPlease select an option to begin:\n\n1. Click "Start Demo" to load the operational data.\n2. Click "Vanessa Mode" for the confidential sanitized evaluation.\n3. Or ask a question directly below.`;
        }
      } else {
        // OPERATIONAL QUERIES
        if (fuzzyMatch(lowerQ, ['mortuary', 'occupancy', 'deceased', 'facilities', 'status', 'facility'])) {
          responseText = `MORTUARY OCCUPANCY & FACILITY TELEMETRY\n\n${data.facilities.map(f => `${f.name}:\n  • Total Deceased: ${f.deceased}\n  • Claimed: ${f.claimed}\n  • Unclaimed: ${f.unclaimed}\n  • Capacity Used: ${f.capacity_used}`).join('\n\n')}\n\nAGGREGATE OCCUPANCY METRICS:\n• Total Deceased Under Custody: ${data.facilities.reduce((sum, f) => sum + f.deceased, 0)}\n• Claimed Cases: ${data.facilities.reduce((sum, f) => sum + f.claimed, 0)}\n• Unclaimed Cases: ${data.facilities.reduce((sum, f) => sum + f.unclaimed, 0)}\n• Family Confirmation Rate: ${Math.round((data.facilities.reduce((sum, f) => sum + f.claimed, 0) / data.facilities.reduce((sum, f) => sum + f.deceased, 0)) * 100)}%\n• Overall Facility Utilization: NOMINAL`;
        }
        else if (fuzzyMatch(lowerQ, ['which', 'funeral', 'service', 'company', 'organization', 'name', 'who', 'branches'])) {
          responseText = `ENTERPRISE ARCHITECTURE TENANT PROFILE\n\nEntity Name: THLOLO VICTORY FUNERAL SERVICES\nIndustry: Death Care, Mortuary & Funeral Logistics\nJurisdiction: Free State Province, South Africa\n\nOPERATIONAL NODES:\n• Primary Mortuary & Facility (Qwaqwa Hub)\n• Secondary Facility (Bethlehem Hub)\n• Tertiary Branch (Reitz Branch)\n\nWORKFORCE & ASSET FOOTPRINT:\n• Core Operational Staff: 8 personnel\n• Fleet Allocation: 5 Dedicated Drivers (Sibusiso, Kagiso, Tebogo, Mandla, Thabo)\n• Active Plans: 5 Product Tiers (Supreme to Basic)\n• Customer Satisfaction Baseline: 9.2/10 NPS: 72`;
        }
        else if (fuzzyMatch(lowerQ, ['weekend', 'saturday', 'sunday', 'week look', 'week look like', 'services', 'schedule', 'capacity'])) {
          responseText = `WEEKEND OPERATIONS FORECAST & LOGISTICS AUDIT\n\nSCHEDULED SERVICES: ${data.weekend.services_scheduled} funerals\n• Expected Revenue: ${data.weekend.expected_revenue}\n• Staff Allocated: ${data.weekend.staff_allocated}/${data.weekend.staff_available} active personnel\n\nEQUIPMENT & INFRASTRUCTURE AUDIT:\n• Home Tents Required: ${data.weekend.tents_needed}\n• Home Tents Available: ${data.weekend.tents_available} (${Math.round((data.weekend.tents_available / data.weekend.tents_needed) * 100)}% available)\n• Status: ${data.weekend.shortage_alert ? 'SHORTAGE!' : 'OK'}\n\n${data.weekend.shortage_alert ? `CRITICAL ALERT:\n• Alert Detail: ${data.weekend.shortage_details}\n• Action Required: Secure 2 rental units immediately to fulfill Saturday schedule without client disruption.` : 'Logistics nominal for weekend execution.'}`;
        }
        else if (fuzzyMatch(lowerQ, ['claim', 'arrangement', 'arrangements', 'scheduling', 'pending', 'pipeline'])) {
          responseText = `CLAIMS & ARRANGEMENT PIPELINE AUDIT\n\nCASE VOLUME (Current Month):\n• Total Cases Ingested: ${data.claims.total_cases}\n• Completed Cases: ${data.claims.completed_this_month}\n• On-Time Completion Rate: ${data.claims.on_time_completion}%\n• Overdue Scheduling: ${data.claims.overdue_count}\n\nWORKFLOW STAGES:\n• Cleansing Scheduled: ${data.claims.cleansing_scheduled}/${data.claims.total_cases}\n• Delivery Pending: ${data.claims.delivery_pending} cases (ACTION NEEDED)\n• Service Pending: ${data.claims.service_pending} cases (ACTION NEEDED)\n• Mean Completion Cycle: ${data.claims.avg_days_to_completion} days\n\nPRIORITY DIRECTIVE:\n1. Re-engage ${data.claims.overdue_count} overdue client files to finalize delivery window.`;
        }
        else if (fuzzyMatch(lowerQ, ['stock', 'inventory', 'supplies', 'fridge', 'casket', 'tent', 'chair', 'table'])) {
          responseText = `CRITICAL INVENTORY & STOCK AUDIT\n\nNOMINAL INVENTORY:\n${data.stock.adequate_items.map(item => `  • ${item}: Adequate stock`).join('\n')}\n\nLOW STOCK WARNINGS:\n${data.stock.low_items.map(item => `  • ${item}: ACTION REQUIRED`).join('\n')}\n\nREORDER QUEUE:\n${data.stock.reorder_needed.map(item => `  • ${item} (High Priority)`).join('\n')}\n\nAUDIT METRICS:\n• Last Inventory Reconciliation: ${data.stock.last_restocked}\n• Supply Chain Risk: Moderate (Tent stock bottleneck)`;
        }
        else if (fuzzyMatch(lowerQ, ['fleet', 'vehicles', 'cars', 'hearses', 'drivers', 'logistics', 'transport', 'registration', 'reg', 'plate'])) {
          responseText = `FLEET TELEMETRY & ASSET REGISTRY\n\nWEEKEND RESOURCE DEMAND (${data.weekend.services_scheduled} services):\n• Hearses Required: ${data.fleet.hearses_needed} | Available: ${data.fleet.hearses_available} (SURPLUS 1)\n• Family Cars Required: ${data.fleet.family_cars_needed} | Available: ${data.fleet.family_cars_available} (SURPLUS 1)\n• Fleet Utilization Rate: ${data.fleet.utilization}\n\nASSET REGISTRY & SERVICE TELEMETRY:\n\nHEARSES:\n  1. ${data.fleet.vehicles[0].name}\n     • Plate: ${data.fleet.vehicles[0].reg} | Driver: ${data.fleet.vehicles[0].driver}\n     • Status: ${data.fleet.vehicles[0].status} | Odometer: ${data.fleet.vehicles[0].mileage}\n     • Next Scheduled Maintenance: ${data.fleet.vehicles[0].next_service}\n\n  2. ${data.fleet.vehicles[1].name}\n     • Plate: ${data.fleet.vehicles[1].reg} | Driver: ${data.fleet.vehicles[1].driver}\n     • Status: ${data.fleet.vehicles[1].status} | Odometer: ${data.fleet.vehicles[1].mileage}\n     • Next Scheduled Maintenance: ${data.fleet.vehicles[1].next_service}\n\nFAMILY VEHICLES:\n  3. ${data.fleet.vehicles[2].name}\n     • Plate: ${data.fleet.vehicles[2].reg} | Driver: ${data.fleet.vehicles[2].driver}\n     • Status: ${data.fleet.vehicles[2].status} | Odometer: ${data.fleet.vehicles[2].mileage}\n     • Next Scheduled Maintenance: ${data.fleet.vehicles[2].next_service}\n\n  4. ${data.fleet.vehicles[3].name}\n     • Plate: ${data.fleet.vehicles[3].reg} | Driver: ${data.fleet.vehicles[3].driver}\n     • Status: ${data.fleet.vehicles[3].status} | Odometer: ${data.fleet.vehicles[3].mileage}\n     • Next Scheduled Maintenance: ${data.fleet.vehicles[3].next_service}\n\n  5. ${data.fleet.vehicles[4].name}\n     • Plate: ${data.fleet.vehicles[4].reg} | Driver: ${data.fleet.vehicles[4].driver}\n     • Status: ${data.fleet.vehicles[4].status} | Odometer: ${data.fleet.vehicles[4].mileage}\n     • Next Scheduled Maintenance: ${data.fleet.vehicles[4].next_service}\n\nLOGISTICS COMPLIANCE: 100% Vehicles Operational, 0 Overdue Services.`;
        }
        else if (fuzzyMatch(lowerQ, ['plan', 'performance', 'plans', 'popular', 'tier'])) {
          responseText = generatePlanPerformance(data);
        }
        else if (fuzzyMatch(lowerQ, ['revenue', 'upsell', 'catering', 'flowers', 'deco', 'opportunity', 'addon', 'add-on', 'margin'])) {
          responseText = generateRevenueOpportunity(data);
        }
        else if (fuzzyMatch(lowerQ, ['staff', 'utilization', 'capacity', 'workload', 'team', 'hire', 'recruitment'])) {
          responseText = generateStaffUtilization(data);
        }
        else if (fuzzyMatch(lowerQ, ['time', 'delivery', 'on-time', 'completed', 'overdue', 'bottleneck', 'delay'])) {
          responseText = generateOnTimeDelivery(data);
        }
        else if (fuzzyMatch(lowerQ, ['satisfaction', 'happy', 'rating', 'feedback', 'nps'])) {
          responseText = generateCustomerSatisfaction(data);
        }
        else if (fuzzyMatch(lowerQ, ['forecast', 'demand', 'projection', 'ahead', 'upcoming', 'peak', 'busy'])) {
          responseText = generateDemandForecast(data);
        }
        else if (fuzzyMatch(lowerQ, ['recommendation', 'recommend', 'suggest', 'strategy', 'strategic', 'action', 'priority', 'focus', 'summary', 'roadmap'])) {
          responseText = generateStrategicRecommendations(data);
        }
        else if (fuzzyMatch(lowerQ, ['report', 'weekly', 'overview', 'complete', 'full'])) {
          responseText = generateWeeklyReport(data);
        }
        else {
          responseText = `COMMAND QUERY UNMATCHED: "${currentQ}"\n\nValid diagnostic commands include:\n\nOPERATIONS:\n• "mortuary occupancy" - Facilities & deceased capacity\n• "fleet telemetry" - Vehicles, drivers & maintenance schedules\n• "weekend forecast" - Services & equipment shortage alert\n• "stock status" - Inventory levels & reorder queue\n• "arrangement pipeline" - Cleansing, delivery & overdue cases\n\nBUSINESS INTELLIGENCE:\n• "plan performance" - Revenue, volume & margin by tier\n• "revenue opportunities" - Add-on upsell analysis\n• "workforce capacity" - Staff load & surge readiness\n• "demand forecast" - 30-day case forecast\n• "strategic roadmap" - Prioritized engineering recommendations`;
        }
      }

      const finalResponse = sanitizeForVanessa(responseText);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'assistant',
        text: finalResponse,
        timestamp: new Date()
      }]);
      setLoading(false);
    }, 850);
  };

  const handleChipClick = (text) => {
    setQuestion(text);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetSession = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'assistant',
        text: "DTech OpsCore™ Session Reset.\n\nAll subsystem channels re-initialized. Ready for diagnostic commands.",
        timestamp: new Date()
      }
    ]);
  };

  const toggleEnvironment = () => {
    const data = createDemoData();
    if (authMode === 'vanessa') {
      setAuthMode('demo');
      setIsAuthenticated(true);
      setDemoData(data);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'assistant',
        text: "ENVIRONMENT SWITCHED: ENTERPRISE TELEMETRY PROFILE (Thlolo Victory Live Data).\n\nReal provincial identifiers and fleet data are now active.",
        timestamp: new Date()
      }]);
    } else {
      setAuthMode('vanessa');
      setIsAuthenticated(true);
      setDemoData(data);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'assistant',
        text: "ENVIRONMENT SWITCHED: SANITIZED SANDBOX (Vanessa Protocol).\n\nClient data masked for confidential architecture evaluation.",
        timestamp: new Date()
      }]);
    }
  };

  // Curated architect query suggestions by category
  const domainSuggestions = {
    all: isAuthenticated
      ? ["How's our weekend look?", "Mortuary occupancy status", "Fleet telemetry & drivers", "Plan performance analysis", "Revenue opportunities?", "Strategic roadmap"]
      : ["Start demo (Enterprise)", "Vanessa mode (Sanitized)", "Mortuary status", "What can you help with?"],
    mortuary: ["Mortuary occupancy status", "Facilities capacity used", "Claimed vs unclaimed cases"],
    fleet: ["Fleet telemetry & drivers", "Hearses and family cars needed", "Vehicle maintenance schedules"],
    pipeline: ["Arrangement pipeline audit", "On-time delivery metrics", "Overdue cases and bottlenecks"],
    workforce: ["Workforce utilization rate", "Peak capacity analysis", "Week 3 staffing surge recommendation"],
    bi: ["Plan performance analysis", "Revenue opportunities & add-ons", "Customer satisfaction & NPS score", "Demand forecast (30 days)"],
    strategy: ["Strategic roadmap & priorities", "Revenue impact model", "Critical action items"]
  };

  return (
    <>
      <Helmet>
        <title>DTech OpsCore™ - Enterprise Funeral Operations & Intelligence Console</title>
        <meta name="description" content="Mission-critical solution architecture console for funeral service operations, fleet logistics, mortuary occupancy, and executive business intelligence." />
      </Helmet>

      {/* Enterprise System Header Ribbon */}
      <div style={{
        paddingTop: '6.5rem',
        paddingBottom: '1.5rem',
        backgroundColor: '#020617',
        borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {/* System Breadcrumbs & Architecture Metadata */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              paddingBottom: '12px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '12px',
                color: '#64748b'
              }}>
                <span style={{ color: '#0284c7', fontWeight: '700' }}>DONDAS TECH</span>
                <span>/</span>
                <span>SOLUTIONS ARCHITECTURE</span>
                <span>/</span>
                <span style={{ color: '#cbd5e1' }}>OPSCORE TELEMETRY HUB</span>
              </div>

              {/* Status Indicator Badges */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '11px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '4px',
                  color: '#34d399'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981'
                  }} />
                  SYSTEM: NOMINAL (99.98% SLA)
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  backgroundColor: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  borderRadius: '4px',
                  color: '#38bdf8'
                }}>
                  TELEMETRY: REALTIME (38ms)
                </div>
              </div>
            </div>

            {/* Title & Architecture Subtitle */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              paddingTop: '6px'
            }}>
              <div>
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: '#f8fafc',
                  margin: 0,
                  letterSpacing: '-0.5px'
                }}>
                  Funeral Operations & Intelligence Console
                </h1>
                <p style={{
                  margin: '4px 0 0 0',
                  fontSize: '14px',
                  color: '#94a3b8'
                }}>
                  Enterprise decision-support engine integrating mortuary capacity, fleet logistics telemetry, workforce modeling, and margin analytics.
                </p>
              </div>

              {/* Active Profile Pill */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(51, 65, 85, 0.8)',
                borderRadius: '6px'
              }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>ENVIRONMENT:</span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: isAuthenticated ? (authMode === 'vanessa' ? '#fbbf24' : '#34d399') : '#94a3b8'
                }}>
                  {isAuthenticated
                    ? (authMode === 'vanessa' ? 'Confidential Evaluation Mode' : 'Live Operations Demo')
                    : 'Awaiting Selection'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Console Chassis */}
      <div style={{
        backgroundColor: '#090d16',
        minHeight: 'calc(100vh - 200px)',
        paddingTop: '2rem',
        paddingBottom: '3rem'
      }}>
        <Section>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {/* Domain Filter Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px'
            }}>
              <span style={{
                fontSize: '11px',
                color: '#94a3b8',
                textTransform: 'uppercase',
                fontWeight: '600',
                letterSpacing: '0.5px',
                marginRight: '6px',
                flexShrink: 0
              }}>
                Browse by Area:
              </span>
              {[
                { id: 'all', label: 'All Operations' },
                { id: 'mortuary', label: 'Mortuary & Facilities' },
                { id: 'fleet', label: 'Fleet & Transport' },
                { id: 'pipeline', label: 'Arrangements & Claims' },
                { id: 'workforce', label: 'Staff & Capacity' },
                { id: 'bi', label: 'Plans & Revenue' },
                { id: 'strategy', label: 'Strategic Summary' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveDomain(tab.id)}
                  style={{
                    padding: '6px 14px',
                    fontSize: '12.5px',
                    borderRadius: '6px',
                    border: activeDomain === tab.id
                      ? '1px solid #0284c7'
                      : '1px solid rgba(51, 65, 85, 0.6)',
                    backgroundColor: activeDomain === tab.id
                      ? 'rgba(2, 132, 199, 0.18)'
                      : 'rgba(15, 23, 42, 0.6)',
                    color: activeDomain === tab.id ? '#38bdf8' : '#94a3b8',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontWeight: activeDomain === tab.id ? '600' : '400',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* End-User Operations Window */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '76vh',
              minHeight: '680px',
              backgroundColor: '#0a0f1d',
              border: '1px solid rgba(51, 65, 85, 0.8)',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
            }}>
              {/* Top Toolbar Header */}
              <div style={{
                padding: '12px 20px',
                backgroundColor: '#0f172a',
                borderBottom: '1px solid rgba(51, 65, 85, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Modern Operations Icon */}
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(2, 132, 199, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#f8fafc',
                        letterSpacing: '-0.2px'
                      }}>
                        Funeral Operations Assistant
                      </span>
                      <span style={{
                        fontSize: '10.5px',
                        padding: '1px 8px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.35)',
                        color: '#34d399',
                        fontWeight: '600'
                      }}>
                        LIVE SYNC
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      Connected to 3 mortuaries, fleet tracking & case records
                    </div>
                  </div>
                </div>

                {/* Toolbar Utilities */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isAuthenticated && (
                    <button
                      type="button"
                      onClick={toggleEnvironment}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        backgroundColor: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(71, 85, 105, 0.6)',
                        borderRadius: '6px',
                        color: '#cbd5e1',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                      title="Toggle between live client records and confidential sample data"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="17 1 21 5 17 9"></polyline>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                        <polyline points="7 23 3 19 7 15"></polyline>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                      </svg>
                      {authMode === 'vanessa' ? 'Switch to Live Data' : 'Switch to Sample Data'}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleResetSession}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      backgroundColor: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid rgba(71, 85, 105, 0.6)',
                      borderRadius: '6px',
                      color: '#cbd5e1',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    title="Start a new conversation"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    New Chat
                  </button>
                </div>
              </div>

              {/* Message Feed Log */}
              <div
                ref={messagesContainerRef}
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  backgroundColor: '#0a0f1d'
                }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    {/* Message Meta Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '6px',
                      fontSize: '12px',
                      color: msg.type === 'user' ? '#94a3b8' : '#38bdf8'
                    }}>
                      {msg.type === 'user' ? (
                        <>
                          <span style={{ fontWeight: '600', color: '#f8fafc' }}>You</span>
                          <span>•</span>
                          <span>{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}</span>
                        </>
                      ) : (
                        <span style={{ fontWeight: '600', color: '#38bdf8' }}>Operations Assistant</span>
                      )}
                    </div>

                    {/* Message Card */}
                    <div style={{
                      maxWidth: msg.type === 'user' ? '75%' : '100%',
                      width: msg.type === 'assistant' ? '100%' : 'auto',
                      backgroundColor: msg.type === 'user'
                        ? 'rgba(2, 132, 199, 0.2)'
                        : 'rgba(15, 23, 42, 0.75)',
                      border: msg.type === 'user'
                        ? '1px solid rgba(56, 189, 248, 0.4)'
                        : '1px solid rgba(51, 65, 85, 0.7)',
                      borderRadius: '10px',
                      padding: '16px 20px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                      position: 'relative'
                    }}>
                      {msg.type === 'assistant' ? (
                        <>
                          <div>{formatMessageText(msg.text)}</div>
                          {/* Copy Utility on Assistant Output */}
                          <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '14px',
                            paddingTop: '10px',
                            borderTop: '1px solid rgba(51, 65, 85, 0.4)'
                          }}>
                            <button
                              type="button"
                              onClick={() => handleCopy(msg.id, msg.text)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: 'transparent',
                                border: 'none',
                                color: copiedId === msg.id ? '#34d399' : '#64748b',
                                fontSize: '11.5px',
                                cursor: 'pointer',
                                padding: '2px 8px',
                                borderRadius: '4px'
                              }}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                              {copiedId === msg.id ? 'Copied Summary!' : 'Copy Summary'}
                            </button>
                          </div>
                        </>
                      ) : (
                        <div style={{
                          color: '#f8fafc',
                          fontSize: '14px',
                          whiteSpace: 'pre-wrap',
                          lineHeight: '1.5'
                        }}>
                          {msg.text}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Friendly Loading Indicator */}
                {loading && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 18px',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '8px',
                    width: 'fit-content',
                    fontSize: '13px',
                    color: '#38bdf8'
                  }}>
                    <div style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '50%',
                      borderTopColor: '#38bdf8',
                      animation: 'spin 0.8s linear infinite'
                    }} />
                    <span>Checking operational records across all branch facilities...</span>
                  </div>
                )}
              </div>

              {/* End-User Friendly Input Bar */}
              <div style={{
                padding: '16px 20px',
                backgroundColor: '#0f172a',
                borderTop: '1px solid rgba(51, 65, 85, 0.8)'
              }}>
                <form
                  onSubmit={handleAsk}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: '#020617',
                    border: '1px solid rgba(51, 65, 85, 0.9)',
                    borderRadius: '8px',
                    padding: '6px 8px 6px 14px',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  {/* Clean Search / Question Icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>

                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey && !loading) {
                        e.preventDefault();
                        handleAsk(e);
                      }
                    }}
                    placeholder="Ask about mortuary capacity, vehicle availability, weekend funerals, revenue..."
                    disabled={loading}
                    rows={1}
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#f8fafc',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'none',
                      outline: 'none',
                      padding: '8px 0',
                      lineHeight: '1.5'
                    }}
                  />

                  <button
                    type="submit"
                    disabled={loading || !question.trim()}
                    style={{
                      padding: '8px 18px',
                      backgroundColor: loading || !question.trim() ? 'rgba(30, 41, 59, 0.6)' : '#0284c7',
                      color: loading || !question.trim() ? '#64748b' : '#ffffff',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '6px',
                      cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>Ask Assistant</span>
                    <span style={{ fontSize: '13px' }}>➔</span>
                  </button>
                </form>

                {/* Subsystem Query Suggestions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginTop: '12px'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#94a3b8',
                    fontWeight: '500',
                    marginRight: '4px'
                  }}>
                    Quick Questions:
                  </span>
                  {(domainSuggestions[activeDomain] || domainSuggestions.all).map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChipClick(chip)}
                      style={{
                        padding: '4px 12px',
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(51, 65, 85, 0.7)',
                        borderRadius: '16px',
                        color: '#cbd5e1',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#38bdf8';
                        e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#cbd5e1';
                        e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.7)';
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

