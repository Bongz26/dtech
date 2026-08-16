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
  return `Based on our operational data, financial metrics, and demand forecasting, here is my strategic roadmap for the company:

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

const getBubbleStyle = (type) => {
  const base = {
    padding: '16px 22px',
    borderRadius: '20px',
    fontSize: '15px',
    lineHeight: '1.6',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    animation: 'slideUpFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  if (type === 'user') {
    return { 
      ...base, 
      backgroundColor: 'rgba(37, 99, 235, 0.9)', 
      color: '#ffffff', 
      borderBottomRightRadius: '6px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      display: 'inline-block',
      border: '1px solid rgba(59, 130, 246, 0.5)'
    };
  } else if (type === 'assistant') {
    return { 
      ...base, 
      backgroundColor: 'rgba(15, 23, 42, 0.75)', 
      color: '#e2e8f0', 
      borderBottomLeftRadius: '6px',
      border: '1px solid rgba(51, 65, 85, 0.8)',
      width: '100%'
    };
  }
  return base;
};

const formatMessageText = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={index} style={{ height: '12px' }} />;

    // Main Headers (All caps ending in colon, or short all caps words)
    if (/^[A-Z\s&]+:$/.test(trimmed) || (trimmed.toUpperCase() === trimmed && trimmed.length > 5 && !trimmed.includes(' ') && !trimmed.includes('•'))) {
      return (
        <div key={index} style={{ 
          color: '#38bdf8', 
          fontWeight: '700', 
          fontSize: '13px', 
          letterSpacing: '1.2px', 
          marginTop: index === 0 ? '4px' : '28px', 
          marginBottom: '14px', 
          borderBottom: '1px solid rgba(56, 189, 248, 0.2)', 
          paddingBottom: '8px',
          textTransform: 'uppercase',
          textShadow: '0 0 10px rgba(56, 189, 248, 0.3)'
        }}>
          {trimmed.replace(':', '')}
        </div>
      );
    }

    // Bullet points
    if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      const content = trimmed.substring(1).trim();
      let innerContent = content;
      if (content.includes(':')) {
         const parts = content.split(':');
         innerContent = <><strong style={{ color: '#f8fafc', fontWeight: '600' }}>{parts[0]}:</strong>{parts.slice(1).join(':')}</>;
      }
      return (
        <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div style={{ 
            color: '#38bdf8', 
            marginRight: '12px', 
            fontSize: '10px', 
            marginTop: '6px',
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            padding: '4px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 8px rgba(56, 189, 248, 0.4)'
          }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>
          </div>
          <span style={{ color: '#cbd5e1', flex: 1, lineHeight: '1.6' }}>{innerContent}</span>
        </div>
      );
    }

    // Lines with colons (Subheaders or key-value pairs)
    if (trimmed.includes(':')) {
      const parts = trimmed.split(':');
      return (
        <div key={index} style={{ marginBottom: '8px', lineHeight: '1.6', color: '#cbd5e1' }}>
          <strong style={{ color: '#f8fafc', fontWeight: '600' }}>{parts[0]}:</strong>
          <span style={{ color: '#cbd5e1' }}>{parts.slice(1).join(':')}</span>
        </div>
      );
    }

    // Regular text
    return (
      <div key={index} style={{ marginBottom: '12px', color: '#cbd5e1', lineHeight: '1.6' }}>
        {trimmed}
      </div>
    );
  });
};

export default function FuneralOpsDemo() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: "Hello! I'm your Dondas Technologies Funeral AI Assistant.\n\nI am equipped to analyze and report on operations, logistics, and business intelligence. I can help you with:\n\nOPERATIONS:\n• Mortuary occupancy & inventory\n• Funeral arrangements & scheduling\n• Stock management & alerts\n• Weekend capacity planning\n• Fleet & vehicle availability\n\nBUSINESS INTELLIGENCE:\n• Plan performance analysis\n• Revenue opportunities\n• Staff utilization & capacity\n• On-time delivery metrics\n• Customer satisfaction tracking\n• Demand forecasting\n• Strategic recommendations\n\nTry asking me anything!",
      timestamp: new Date()
    }
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState(null); // 'vanessa' or 'demo'
  const [demoData, setDemoData] = useState(null);
  const messagesEndRef = useRef(null);
  
  const authKeywords = ["reuben", "test victory", "doing the right things right"];

  // Sanitize data for Vanessa (remove specific client references)
  const sanitizeForVanessa = (text) => {
    if (authMode !== 'vanessa') return text;
    
    return text
      // Replace company name
      .replace(/Thlolo Victory/g, 'Funeral Service')
      .replace(/Tlholo Victory/g, 'Funeral Service')
      .replace(/THLOLO VICTORY/g, 'FUNERAL SERVICE')
      // Replace specific fleet names with generic
      .replace(/Tholo 1 FS/g, 'Fleet Unit 1')
      .replace(/Tholo 2 FS/g, 'Fleet Unit 2')
      .replace(/Tholo 3 FS/g, 'Fleet Unit 3')
      .replace(/Tholo 4 FS/g, 'Fleet Unit 4')
      .replace(/Tholo 5 FS/g, 'Fleet Unit 5')
      // Replace vehicle registrations with generic
      .replace(/THOLO 1 FS/g, 'VEH-001-ZA')
      .replace(/THOLO 2 FS/g, 'VEH-002-ZA')
      .replace(/THOLO 3 FS/g, 'VEH-003-ZA')
      .replace(/THOLO 4 FS/g, 'VEH-004-ZA')
      .replace(/THOLO 5 FS/g, 'VEH-005-ZA')
      // Replace branch names
      .replace(/Qwaqwa Branch/g, 'Branch A')
      .replace(/Bethlehem Branch/g, 'Branch B')
      .replace(/Reitz Branch/g, 'Branch C')
      .replace(/Qwaqwa/g, 'Branch A')
      .replace(/Bethlehem/g, 'Branch B')
      .replace(/Reitz/g, 'Branch C')
      .replace(/Mpumalanga/g, 'Branch D')
      // Replace driver names
      .replace(/Sibusiso/g, 'Driver 1')
      .replace(/Kagiso/g, 'Driver 2')
      .replace(/Tebogo/g, 'Driver 3')
      .replace(/Mandla/g, 'Driver 4')
      .replace(/Thabo/g, 'Driver 5')
      // Replace mortuary names
      .replace(/Qwaqwa Mortuary/g, 'Primary Mortuary')
      .replace(/BHM Mortuary/g, 'Secondary Mortuary')
      .replace(/Branch Facility/g, 'Tertiary Facility')
      .replace(/Main Mortuary/g, 'Primary Mortuary')
      .replace(/Secondary Mortuary/g, 'Secondary Mortuary')
      .replace(/Primary Mortuary/g, 'Primary Mortuary')
      .replace(/Head Office/g, 'Head Office')
      // Keep the functionality, just generic names
      .replace(/THS-/g, 'CASE-');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAsk = (e) => {
    if(e) e.preventDefault();
    if (!question.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: question }]);
    const currentQ = question;
    setQuestion('');
    setLoading(true);

    setTimeout(() => {
      let responseText = '';
      const lowerQ = currentQ.toLowerCase();
      const data = demoData || createDemoData();

      // Authentication flow
      if (!isAuthenticated) {
        // Vanessa Mode (Sanitized)
        if (lowerQ.includes('vanessa')) {
          setIsAuthenticated(true);
          setAuthMode('vanessa');
          setDemoData(data);
          responseText = `Welcome Vanessa! I am the Dondas Technologies AI Manager, configured specifically for Funeral Service Operations.\n\nI am currently running in a test environment with generic sanitized data to protect client confidentiality.\n\nYou can ask me about:\n\nOPERATIONS:\n• Mortuary occupancy & deceased tracking\n• Funeral arrangements & scheduling\n• Stock management & alerts\n• Weekend capacity planning\n• Fleet & vehicle availability\n\nBUSINESS INTELLIGENCE:\n• Plan performance analysis\n• Revenue opportunities\n• Staff utilization & capacity\n• On-time delivery metrics\n• Customer satisfaction tracking\n• Demand forecasting\n• Strategic recommendations\n\nWhat would you like to explore?`;
        } else if (authKeywords.some(k => lowerQ.includes(k))) {
          setIsAuthenticated(true);
          setAuthMode('demo');
          setDemoData(data);
          responseText = `Welcome to the Dondas Technologies AI Demo!\n\nI have successfully loaded the comprehensive operational dataset for this presentation.\n\nYou can now ask me advanced queries about:\n\nOPERATIONS: Mortuary status, inventory, arrangements, weekend planning, fleet\nBUSINESS: Plans, revenue, staff, satisfaction, forecasts, recommendations\n\nWhat metrics or insights would you like to dive into?`;
        } else {
          responseText = `Hello! Please type "start demo" or "show me" to begin exploring funeral service operations with AI-powered insights.\n\n(Or type "vanessa" for the sanitized test mode)`;
        }
      } else {
        // OPERATIONAL QUERIES
        if (fuzzyMatch(lowerQ, ['mortuary', 'occupancy', 'deceased', 'facilities', 'status'])) {
          responseText = `I've checked the latest data across all our facilities. Here is the current mortuary occupancy status:\n\nMORTUARY OCCUPANCY STATUS\n\n${data.facilities.map(f => `${f.name}:\n  • Total Deceased: ${f.deceased}\n  • Claimed: ${f.claimed}\n  • Unclaimed: ${f.unclaimed}\n  • Capacity Used: ${f.capacity_used}`).join('\n\n')}\n\nOVERALL:\n• Total Deceased: ${data.facilities.reduce((sum, f) => sum + f.deceased, 0)}\n• Total Claimed: ${data.facilities.reduce((sum, f) => sum + f.claimed, 0)}\n• Total Unclaimed: ${data.facilities.reduce((sum, f) => sum + f.unclaimed, 0)}\n• Family Response Rate: ${Math.round((data.facilities.reduce((sum, f) => sum + f.claimed, 0) / data.facilities.reduce((sum, f) => sum + f.deceased, 0)) * 100)}%`;
        }
        // NEW: Which funeral service?
        else if (fuzzyMatch(lowerQ, ['which', 'funeral', 'service', 'company', 'organization', 'name', 'who', 'branches'])) {
          responseText = `You are viewing the operational profile for Thlolo Victory Funeral Services.\n\nFUNERAL SERVICE INFORMATION\n\nCompany: THLOLO VICTORY FUNERAL SERVICES\n\nLOCATIONS:\n• Primary Mortuary (Qwaqwa Branch)\n• Secondary Mortuary (Bethlehem Branch)\n• Tertiary Facility (Reitz Branch)\n\nOPERATIONAL STAFF:\n• Management: Director + Branch Managers\n• Operations: 8 core team members\n• Fleet: 5 drivers (Sibusiso, Kagiso, Tebogo, Mandla, Thabo)\n\nFOCUS AREAS:\n• Multiple plan tiers (Supreme to Basic)\n• Premium services (Catering, Flowers, Decorations)\n• Full logistics coordination\n• Customer satisfaction focus (9.2/10)\n\nThis system manages their entire logistics and operations footprint across the Free State Province.`;
        }
        else if (fuzzyMatch(lowerQ, ['weekend', 'saturday', 'sunday', 'week look', 'week look like', 'services', 'schedule', 'capacity'])) {
          responseText = `I've analyzed our upcoming schedule. The weekend is looking busy but manageable, with one critical alert to note.\n\nWEEKEND SERVICES FORECAST\n\nSCHEDULED SERVICES: ${data.weekend.services_scheduled}\n• Expected Revenue: ${data.weekend.expected_revenue}\n• Staff Allocated: ${data.weekend.staff_allocated}/${data.weekend.staff_available}\n\nCAPACITY ANALYSIS:\n• Tents: ${data.weekend.tents_available}/${data.weekend.tents_needed} available (${Math.round((data.weekend.tents_available/data.weekend.tents_needed)*100)}%) ${data.weekend.shortage_alert ? 'SHORTAGE!' : 'OK'}\n\n${data.weekend.shortage_alert ? `ALERT: ${data.weekend.shortage_details}\nRECOMMENDATION: Arrange emergency rentals immediately. This is critical for weekend success.` : 'All systems go for the weekend!'}`;
        }
        else if (fuzzyMatch(lowerQ, ['claim', 'arrangement', 'arrangements', 'scheduling', 'pending'])) {
          responseText = `Here is the current pipeline for claims and arrangements. We're maintaining an 87% on-time delivery rate.\n\nCLAIM & ARRANGEMENT STATUS\n\nTOTAL CASES: ${data.claims.total_cases}\n• Completed: ${data.claims.completed_this_month}\n• On-Time: ${data.claims.on_time_completion}%\n• Overdue: ${data.claims.overdue_count}\n\nSTAGE BREAKDOWN:\n• Cleansing Scheduled: ${data.claims.cleansing_scheduled}/${data.claims.total_cases}\n• Delivery Pending: ${data.claims.delivery_pending} cases\n• Service Pending: ${data.claims.service_pending} cases\n\nAVERAGE COMPLETION TIME: ${data.claims.avg_days_to_completion} days\n\nACTION: Contact ${data.claims.overdue_count} families for delivery/service confirmations`;
        }
        else if (fuzzyMatch(lowerQ, ['stock', 'inventory', 'supplies', 'fridge', 'casket', 'tent', 'chair', 'table', 'supplies'])) {
          responseText = `I've scanned the inventory system. Most items are adequate, but we need to reorder tents immediately.\n\nINVENTORY & STOCK STATUS\n\nADEQUATE ITEMS:\n${data.stock.adequate_items.map(item => `  • ${item}`).join('\n')}\n\nLOW STOCK ITEMS:\n${data.stock.low_items.map(item => `  • ${item}`).join('\n')}\n\nREQUIRES REORDERING:\n${data.stock.reorder_needed.map(item => `  • ${item}`).join('\n')}\n\nLast Restocked: ${data.stock.last_restocked}\n\nRECOMMENDATION: Priority - resolve tent shortage before weekend. Long-term: expand inventory by 3 home tents.`;
        }
        else if (fuzzyMatch(lowerQ, ['fleet', 'vehicles', 'cars', 'hearses', 'drivers', 'logistics', 'transport', 'registration', 'reg', 'plate'])) {
          responseText = `Here is the comprehensive fleet registry, including vehicle plates, maintenance schedules, and assigned drivers.\n\nFLEET STATUS & ALLOCATION\n\nWEEKEND REQUIREMENTS (${data.weekend.services_scheduled} services):\n• Hearses: ${data.fleet.hearses_needed} needed | ${data.fleet.hearses_available} available\n• Family Cars: ${data.fleet.family_cars_needed} needed | ${data.fleet.family_cars_available} available\n\nDETAILED VEHICLE REGISTRY:\n\nHEARSES:\n  1. ${data.fleet.vehicles[0].name}\n     • Registration: ${data.fleet.vehicles[0].reg}\n     • Driver: ${data.fleet.vehicles[0].driver}\n     • Status: ${data.fleet.vehicles[0].status}\n     • Mileage: ${data.fleet.vehicles[0].mileage}\n     • Last Service: ${data.fleet.vehicles[0].last_service}\n     • Next Service: ${data.fleet.vehicles[0].next_service}\n\n  2. ${data.fleet.vehicles[1].name}\n     • Registration: ${data.fleet.vehicles[1].reg}\n     • Driver: ${data.fleet.vehicles[1].driver}\n     • Status: ${data.fleet.vehicles[1].status}\n     • Mileage: ${data.fleet.vehicles[1].mileage}\n     • Last Service: ${data.fleet.vehicles[1].last_service}\n     • Next Service: ${data.fleet.vehicles[1].next_service}\n\nFAMILY CARS:\n  1. ${data.fleet.vehicles[2].name}\n     • Registration: ${data.fleet.vehicles[2].reg}\n     • Driver: ${data.fleet.vehicles[2].driver}\n     • Status: ${data.fleet.vehicles[2].status}\n     • Mileage: ${data.fleet.vehicles[2].mileage}\n     • Last Service: ${data.fleet.vehicles[2].last_service}\n     • Next Service: ${data.fleet.vehicles[2].next_service}\n\n  2. ${data.fleet.vehicles[3].name}\n     • Registration: ${data.fleet.vehicles[3].reg}\n     • Driver: ${data.fleet.vehicles[3].driver}\n     • Status: ${data.fleet.vehicles[3].status}\n     • Mileage: ${data.fleet.vehicles[3].mileage}\n     • Last Service: ${data.fleet.vehicles[3].last_service}\n     • Next Service: ${data.fleet.vehicles[3].next_service}\n\n  3. ${data.fleet.vehicles[4].name}\n     • Registration: ${data.fleet.vehicles[4].reg}\n     • Driver: ${data.fleet.vehicles[4].driver}\n     • Status: ${data.fleet.vehicles[4].status}\n     • Mileage: ${data.fleet.vehicles[4].mileage}\n     • Last Service: ${data.fleet.vehicles[4].last_service}\n     • Next Service: ${data.fleet.vehicles[4].next_service}\n\nUTILIZATION: ${data.fleet.utilization}\n\nSTATUS: Fully resourced for weekend operations\nALL VEHICLES: Current on maintenance\nALL DRIVERS: On duty and ready`;
        }

        // BUSINESS INTELLIGENCE QUERIES
        else if (fuzzyMatch(lowerQ, ['plan', 'performance', 'plans', 'revenue', 'popular'])) {
          responseText = generatePlanPerformance(data);
        }
        else if (fuzzyMatch(lowerQ, ['revenue', 'upsell', 'catering', 'flowers', 'deco', 'opportunity', 'addon', 'add-on'])) {
          responseText = generateRevenueOpportunity(data);
        }
        else if (fuzzyMatch(lowerQ, ['staff', 'utilization', 'capacity', 'workload', 'team', 'hire', 'recruitment'])) {
          responseText = generateStaffUtilization(data);
        }
        else if (fuzzyMatch(lowerQ, ['time', 'delivery', 'on-time', 'completed', 'overdue', 'bottleneck', 'delay'])) {
          responseText = generateOnTimeDelivery(data);
        }
        else if (fuzzyMatch(lowerQ, ['satisfaction', 'satisfaction', 'happy', 'rating', 'feedback', 'nps'])) {
          responseText = generateCustomerSatisfaction(data);
        }
        else if (fuzzyMatch(lowerQ, ['forecast', 'demand', 'projection', 'ahead', 'upcoming', 'peak', 'busy'])) {
          responseText = generateDemandForecast(data);
        }
        else if (fuzzyMatch(lowerQ, ['recommendation', 'recommend', 'suggest', 'strategy', 'strategic', 'action', 'priority', 'focus', 'summary'])) {
          responseText = generateStrategicRecommendations(data);
        }
        else if (fuzzyMatch(lowerQ, ['report', 'weekly', 'overview', 'complete', 'full'])) {
          responseText = generateWeeklyReport(data);
        }
        else {
          responseText = `I didn't quite catch that. You asked: "${currentQ}"\n\nI can provide deep insights on the following topics:\n\nOPERATIONS:\n• Mortuary occupancy & facilities\n• Funeral arrangements & scheduling  \n• Inventory & stock levels\n• Weekend capacity planning\n• Fleet availability\n\nBUSINESS INTELLIGENCE:\n• Plan performance & revenue\n• Revenue opportunities & add-ons\n• Staff utilization & capacity\n• On-time delivery metrics\n• Customer satisfaction\n• Demand forecasting\n• Strategic recommendations\n\nPlease rephrase your question or select one of the core topics above.`;
        }
      }

      // Sanitize response for Vanessa mode
      const finalResponse = sanitizeForVanessa(responseText);
      
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'assistant', text: finalResponse }]);
      setLoading(false);
    }, 1200);
  };

  const handleChipClick = (text) => {
    setQuestion(text);
  };

  const suggestions = isAuthenticated ? [
    "How's our weekend look?",
    "Plan performance analysis",
    "Revenue opportunities?",
    "car reg?",
    "which funeral service?"
  ] : [
    "Start demo",
    "Vanessa mode (test)",
    "What can you help with?"
  ];

  return (
    <>
      <Helmet>
        <title>Dondas Technologies - Funeral Services AI Demo</title>
        <meta name="description" content="Smart AI Assistant combining operational management with business intelligence for funeral services." />
      </Helmet>
      
      <div style={{ 
        paddingTop: '8rem', 
        paddingBottom: '2rem', 
        background: 'linear-gradient(135deg, #0b1121 0%, #172554 100%)', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract glowing background elements for premium feel */}
        <div style={{ position: 'absolute', top: '-20%', left: '10%', width: '300px', height: '300px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: '#f8fafc', textShadow: '0 2px 10px rgba(0,0,0,0.3)', letterSpacing: '-0.5px' }}>Dondas Technologies</h1>
          <p className="text-muted" style={{ fontSize: '1.25rem', color: '#94a3b8' }}>
            AI-Powered Funeral Services Intelligence Platform
          </p>
          {isAuthenticated && <p style={{ color: '#10b981', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
            Demo Mode Active
          </p>}
        </div>
      </div>

      <div style={{ background: 'linear-gradient(to bottom, #172554, #0b1121)', minHeight: '100vh', paddingBottom: '4rem' }}>
        <Section>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '80vh',
            minHeight: '700px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)', // Glassmorphism base
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: '#ffffff',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: '20px',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05) inset',
            margin: '0 auto',
            maxWidth: '1000px',
            position: 'relative',
            zIndex: 10
          }}>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
              @keyframes bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
              }
              @keyframes slideUpFadeIn {
                from { opacity: 0; transform: translateY(20px) scale(0.98); }
                to { opacity: 1; transform: translateY(0) scale(1); }
              }
              .suggestion-chip:hover {
                background-color: rgba(56, 189, 248, 0.15) !important;
                border-color: rgba(56, 189, 248, 0.4) !important;
                color: #f8fafc !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(56, 189, 248, 0.1);
              }
              textarea::placeholder {
                color: #64748b;
              }
              ::-webkit-scrollbar {
                width: 6px;
              }
              ::-webkit-scrollbar-track {
                background: transparent; 
              }
              ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1); 
                border-radius: 10px;
              }
              ::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.2); 
              }
            `}</style>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              backgroundColor: 'rgba(15, 23, 42, 0.4)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
            }}>
              <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'linear-gradient(to right, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8))'
              }}>
                <div style={{ position: 'relative' }}>
                  <img src={aiAvatar} alt="AI Avatar" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)', border: '2px solid rgba(56, 189, 248, 0.8)' }} />
                  <div style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', border: '2px solid #1e293b' }}></div>
                </div>
                <div>
                  <h2 style={{
                    margin: 0,
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#f8fafc',
                    letterSpacing: '-0.5px'
                  }}>Funeral Services Intelligence AI</h2>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {!isAuthenticated && 'System Ready - Awaiting Initialization'}
                    {isAuthenticated && authMode === 'vanessa' && <><span style={{ color: '#f59e0b' }}>🔐 Sanitized Test Environment</span></>}
                    {isAuthenticated && authMode === 'demo' && <><span style={{ color: '#10b981' }}>✅ Enterprise Data Loaded</span></>}
                  </p>
                </div>
              </div>

              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ 
                    display: 'flex', 
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', 
                    width: '100%',
                    marginBottom: '12px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '16px', 
                      alignItems: 'flex-end', 
                      maxWidth: msg.type === 'assistant' ? '85%' : '75%', 
                      flexDirection: msg.type === 'user' ? 'row-reverse' : 'row' 
                    }}>
                      {msg.type === 'assistant' && (
                        <img src={aiAvatar} alt="AI" style={{ width: '32px', height: '32px', borderRadius: '50%', marginBottom: '4px', objectFit: 'cover', boxShadow: '0 0 12px rgba(56, 189, 248, 0.4)', flexShrink: 0, border: '1px solid rgba(56, 189, 248, 0.5)' }} />
                      )}
                      <div style={getBubbleStyle(msg.type)}>
                        {msg.type === 'assistant' ? formatMessageText(msg.text) : msg.text}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      padding: '16px 24px',
                      backgroundColor: 'rgba(30, 41, 59, 0.6)',
                      borderRadius: '20px',
                      borderBottomLeftRadius: '6px',
                      border: '1px solid rgba(51, 65, 85, 0.8)',
                      width: 'fit-content',
                      backdropFilter: 'blur(10px)',
                      animation: 'slideUpFadeIn 0.3s ease-out forwards'
                    }}>
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#38bdf8', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.32s' }} />
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#38bdf8', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.16s' }} />
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#38bdf8', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div style={{
                padding: '24px 32px',
                background: 'rgba(15, 23, 42, 0.8)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)'
              }}>
                <form style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '10px 10px 10px 20px',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'border-color 0.3s ease'
                }} onSubmit={handleAsk}>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey && !loading) {
                        e.preventDefault();
                        handleAsk(e);
                      }
                    }}
                    placeholder="Ask about operations, plans, revenue, staff, satisfaction, forecasts..."
                    disabled={loading}
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#f8fafc',
                      fontSize: '15px',
                      fontFamily: 'inherit',
                      resize: 'none',
                      maxHeight: '120px',
                      outline: 'none',
                      padding: '10px 0',
                      lineHeight: '1.5'
                    }}
                    rows={1}
                  />
                  <button
                    type="submit"
                    disabled={loading || !question.trim()}
                    style={{
                      padding: '14px',
                      backgroundColor: loading || !question.trim() ? 'rgba(59, 130, 246, 0.5)' : '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: loading || !question.trim() ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.4)'
                    }}
                  >
                    {loading ? (
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderRadius: '50%',
                        borderTopColor: '#fff',
                        animation: 'spin 1s ease-in-out infinite'
                      }} />
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </form>

                {messages.length <= 2 && (
                  <div style={{ marginTop: '24px' }}>
                    <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Suggested Queries:</div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {suggestions.map((text, i) => (
                        <div key={i} className="suggestion-chip" style={{
                          padding: '8px 16px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '24px',
                          color: '#cbd5e1',
                          fontSize: '13px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                          backdropFilter: 'blur(4px)'
                        }} onClick={() => handleChipClick(text)}>
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
