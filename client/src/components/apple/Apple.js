import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../common/Layout';

export const Apple = () => {
  const [stepCount, setStepCount] = useState(40);

  useEffect(() => {
    // Canvas rendering fix
    const knobs = document.getElementsByClassName('knob');
    if (knobs.length > 0) {
      window.$(knobs).knob();
    }
  }, []);
  return (
    <div className='content-wrapper'>
      <Layout
        heading='Apple Dashboard'
        item='apple'
      />
      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-4'>
              <div className='card card-success'>
                <div className='card-header'>
                  <h3 className='card-title'>Step Count</h3>
                  <div className='card-tools'>
                    <button
                      type='button'
                      className='btn btn-tool'
                      data-card-widget='collapse'>
                      <i className='fas fa-minus' />
                    </button>
                    <button
                      type='button'
                      className='btn btn-tool'
                      data-card-widget='remove'>
                      <i className='fas fa-times' />
                    </button>
                  </div>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-12 text-center'>
                      <div style={{ display: 'inline', width: 90, height: 90 }}>
                        <canvas
                          width={90}
                          height={90}
                        />
                        <input
                          type='text'
                          className='knob'
                          defaultValue={10}
                          value={3200}
                          data-min={0}
                          data-max={4000}
                          data-width={90}
                          data-height={90}
                          data-fgcolor='#3c8dbc'
                          data-readonly='true'
                          readOnly='readonly'
                          style={{
                            width: 49,
                            height: 30,
                            position: 'absolute',
                            verticalAlign: 'middle',
                            marginTop: 30,
                            marginLeft: '-69px',
                            border: 0,
                            background: 'none',
                            font: 'bold 18px Arial',
                            textAlign: 'center',
                            color: 'rgb(60, 141, 188)',
                            padding: 0,
                            appearance: 'none',
                          }}
                        />
                      </div>
                      <div className='knob-label'>Total 4000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
