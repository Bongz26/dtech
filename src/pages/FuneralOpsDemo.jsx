import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';

const baseStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    minHeight: '600px',
    backgroundColor: '#0b1121', 
    color: '#ffffff',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '16px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    margin: '2rem auto',
    maxWidth: '900px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#111827', 
    borderRadius: '16px',
    border: '1px solid #1f2937',
    overflow: 'hidden'
  },
  header: {
    padding: '24px 32px',
    borderBottom: '1px solid #1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
    color: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  subtitle: {
    margin: '4px 0 0 0',
    fontSize: '14px',
    color: '#94a3b8'
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    backgroundColor: '#111827'
  },
  inputSection: {
    padding: '24px 32px',
    backgroundColor: '#111827',
    borderTop: '1px solid #1f2937'
  },
  inputForm: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#0b1121',
    border: '1px solid #1f2937',
    borderRadius: '12px',
    padding: '8px 8px 8px 16px',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: '#e2e8f0',
    fontSize: '15px',
    fontFamily: 'inherit',
    resize: 'none',
    maxHeight: '120px',
    outline: 'none',
    padding: '8px 0'
  },
  submitButton: {
    padding: '12px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  suggestionsContainer: {
    marginTop: '20px'
  },
  suggestionsTitle: {
    fontSize: '14px',
    color: '#94a3b8',
    marginBottom: '12px'
  },
  chipsRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  chip: {
    padding: '10px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid #1f2937',
    borderRadius: '24px',
    color: '#94a3b8',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap'
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTopColor: '#fff',
    animation: 'spin 1s ease-in-out infinite'
  },
  loaderBubble: {
    display: 'flex',
    gap: '6px',
    padding: '16px 20px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    borderBottomLeftRadius: '4px',
    border: '1px solid #1f2937',
    width: 'fit-content'
  },
  loaderDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    animation: 'bounce 1.4s infinite ease-in-out both'
  }
};

const getBubbleStyle = (type) => {
  const base = {
    maxWidth: '75%',
    padding: '16px 20px',
    borderRadius: '16px',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    fontSize: '15px',
    lineHeight: '1.6'
  };

  if (type === 'user') {
    return { 
      ...base, 
      backgroundColor: '#2563eb', 
      color: '#ffffff', 
      borderBottomRightRadius: '4px',
      boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)'
    };
  } else if (type === 'assistant') {
    return { 
      ...base, 
      backgroundColor: 'rgba(255,255,255,0.03)', 
      color: '#e2e8f0', 
      borderBottomLeftRadius: '4px',
      border: '1px solid #1f2937'
    };
  }
  return base;
};

export default function FuneralOpsDemo() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: 'Hello. I am the FuneralOps AI Demo. Try asking me about mortuary occupancy or vehicle availability!',
      timestamp: new Date()
    }
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDemoUnlocked, setIsDemoUnlocked] = useState(false);
  const [clientMode, setClientMode] = useState('');
  const messagesEndRef = useRef(null);

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
      let responseText = "I can help you manage operations. However, this is a portfolio demo version.";
      const lowerQ = currentQ.toLowerCase();
      const magicPhrases = ["reuben", "test victory", "doing the right things right"];
      
      if (magicPhrases.some(p => lowerQ.includes(p))) {
        setIsDemoUnlocked(true);
        setClientMode('thlolo');
        responseText = "Welcome Reuben from Thlolo Victory. I have successfully loaded your operational data.";
      } else if (lowerQ.includes('vanessa')) {
        setIsDemoUnlocked(true);
        setClientMode('vanessa');
        responseText = "Welcome Vanessa this is Dondas Tech AI Manager - For Funeral Service you can ask me about mortuary occupancy, claims, fleet tracking, airtime benefits, or our weekend stock requirements.";
      } else if (isDemoUnlocked) {
        if (lowerQ.includes('mortuary') || lowerQ.includes('occupancy') || lowerQ.includes('decease') || lowerQ.includes('fridge') || lowerQ.includes('bodies')) {
          responseText = "We currently have 13 deceased in total.\n- Qwaqwa Mortuary: 8 Deceased (Thabo Mokoena, Sipho Ndlovu, etc.)\n- BHM Mortuary: 3 Deceased (Bongani Ngcobo, etc.)\n- Mpumalanga Mortuary: 2 Deceased (Thandiwe Mahlangu, Vusi Shabangu)";
        } else if (lowerQ.includes('claim') || lowerQ.includes('arrangement') || lowerQ.includes('status') || lowerQ.includes('plan')) {
          responseText = "4 Families have claimed (3 in Qwaqwa, 1 in Mpumalanga). Cleansing time is scheduled for all 4. We are still pending Friday Delivery time and Saturday Service time.\n\n4 cases are unclaimed:\n- 2 have no policy (Private)\n- 1 has Optimum Cover\n- 1 has Ultimate Cover";
        } else if (lowerQ.includes('vehicle') || lowerQ.includes('car') || lowerQ.includes('fleet') || lowerQ.includes('hearse')) {
          const fleetNames = clientMode === 'thlolo' ? "Thlolo 1 FS, Thlolo 2 FS" : "Fleet Unit 1, Fleet Unit 2";
          responseText = `For the 4 claimed cases this weekend, we need 9 vehicles (4 Hearses and 5 Family Cars).\nAvailable fleet includes ${fleetNames}, etc.\nDrivers on duty: Sibusiso, Kagiso, Tebogo, Mandla, Tshepo.`;
        } else if (lowerQ.includes('casket') || lowerQ.includes('coffin') || lowerQ.includes('grocery')) {
          responseText = "Caskets for the 4 claimed cases:\n- 2x Pongee - Cherry\n- 1x 1/4 View - Kiaat\n- 1x Woven - brown / Mahony Dome\nAll 4 cases receive full Grocery benefits.";
        } else if (lowerQ.includes('airtime') || lowerQ.includes('benefit')) {
          responseText = "Yes, R100 airtime has been automatically sent to the 4 families who came to claim this week as part of their benefits package.";
        } else if (lowerQ.includes('location') || lowerQ.includes('track') || lowerQ.includes('where') || lowerQ.includes('control room') || lowerQ.includes('late')) {
          const driver1 = clientMode === 'thlolo' ? "(Thlolo 1 FS)" : "(Fleet Unit 1)";
          const driver2 = clientMode === 'thlolo' ? "(Thlolo 2 FS)" : "(Fleet Unit 2)";
          responseText = `📍 GPS Tracking Active:\n- Driver Sibusiso ${driver1} is 15 mins away from the cemetery.\n- Driver Kagiso ${driver2} is currently experiencing slight traffic and is projected to be 10 minutes late for the next scheduled service. Control room has been notified to adjust timings.`;
        } else if (lowerQ.includes('repair') || lowerQ.includes('fixing') || lowerQ.includes('who is fixing')) {
          responseText = "The 2 damaged tents were sent to Mokoena Canvas Repairs in Bethlehem. We expect them back by Thursday afternoon. I will monitor their return to ensure we don't face a shortage this weekend.";
        } else if (lowerQ.includes('weekend') || lowerQ.includes('stock') || lowerQ.includes('tent') || lowerQ.includes('inventory') || lowerQ.includes('shortage')) {
          responseText = "🚨 SHORTAGE ALERT 🚨\nWe are expecting 8 services total this weekend, which requires 8 home tents, 16 tables, 800 chairs, and 9 toilets.\n\nHowever, 2 home tents went for repairs! If we bury all 8 deceased this weekend, we will face a critical challenge because we are short on tents.";
        } else {
          responseText = "I'm sorry, I don't have information on that. Try asking me about mortuary occupancy, claims, fleet tracking, airtime benefits, or our weekend stock requirements.";
        }
      } else {
        responseText = "Welcome to the FuneralOps AI Demo. Please enter your customer code or company name to load your workspace.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'assistant', text: responseText }]);
      setLoading(false);
    }, 1500); 
  };

  const handleChipClick = (text) => {
    setQuestion(text);
  };

  return (
    <>
      <Helmet>
          <title>FuneralOps AI Demo | Dondastech</title>
          <meta name="description" content="Interactive demo of the FuneralOps AI Assistant." />
      </Helmet>
      
      <div style={{ paddingTop: '8rem', paddingBottom: '2rem', background: 'linear-gradient(to bottom, var(--color-bg-alt), var(--color-bg))', textAlign: 'center' }}>
          <div className="container">
              <h1>FuneralOps AI Demo</h1>
              <p className="text-muted" style={{ fontSize: '1.25rem' }}>
                  Experience a simulated version of our custom AI operations manager.
              </p>
          </div>
      </div>

      <Section>
        <div style={baseStyles.container}>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            @keyframes bounce {
              0%, 80%, 100% { transform: scale(0); }
              40% { transform: scale(1); }
            }
            .suggestion-chip:hover {
              background-color: rgba(255,255,255,0.08) !important;
              color: #e2e8f0 !important;
            }
            textarea::placeholder {
              color: #64748b;
            }
            ::-webkit-scrollbar {
              width: 8px;
            }
            ::-webkit-scrollbar-track {
              background: #0b1121; 
            }
            ::-webkit-scrollbar-thumb {
              background: #1f2937; 
              border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #374151; 
            }
          `}</style>

          <div style={baseStyles.card}>
            <div style={baseStyles.header}>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h2 style={baseStyles.title}>Ask FuneralOps AI</h2>
                <p style={baseStyles.subtitle}>Your intelligent operations assistant (Demo Mode)</p>
              </div>
            </div>

            <div style={baseStyles.messagesContainer}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ 
                  display: 'flex', 
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', 
                  width: '100%' 
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start', maxWidth: '100%' }}>
                    <div style={getBubbleStyle(msg.type)}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
                  <div style={baseStyles.loaderBubble}>
                    <div style={{...baseStyles.loaderDot, animationDelay: '-0.32s'}} />
                    <div style={{...baseStyles.loaderDot, animationDelay: '-0.16s'}} />
                    <div style={baseStyles.loaderDot} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div style={baseStyles.inputSection}>
              <form style={baseStyles.inputForm} onSubmit={handleAsk}>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !loading) {
                      e.preventDefault();
                      handleAsk(e);
                    }
                  }}
                  placeholder="Ask anything about services, inventory, vehicles, staff, reports..."
                  disabled={loading}
                  style={baseStyles.textInput}
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  style={{
                    ...baseStyles.submitButton,
                    opacity: loading || !question.trim() ? 0.5 : 1,
                    cursor: loading || !question.trim() ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? (
                    <div style={baseStyles.spinner} />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </form>

              {messages.length <= 2 && (
                <div style={baseStyles.suggestionsContainer}>
                  <div style={baseStyles.suggestionsTitle}>Try asking:</div>
                  <div style={baseStyles.chipsRow}>
                    <div className="suggestion-chip" style={baseStyles.chip} onClick={() => handleChipClick("Which services this weekend are not fully prepared?")}>
                      Which services this weekend are not fully prepared?
                    </div>
                    <div className="suggestion-chip" style={baseStyles.chip} onClick={() => handleChipClick("Check mortuary occupancy")}>
                      Check mortuary occupancy
                    </div>
                    <div className="suggestion-chip" style={baseStyles.chip} onClick={() => handleChipClick("Show low stock items")}>
                      Show low stock items
                    </div>
                    <div className="suggestion-chip" style={baseStyles.chip} onClick={() => handleChipClick("Which vehicles are available Saturday?")}>
                      Which vehicles are available Saturday?
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
