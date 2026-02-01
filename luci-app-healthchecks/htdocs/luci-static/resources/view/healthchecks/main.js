'use strict';
'require view';
'require uci';
'require ui';
'require fs';

return view.extend({
    load: function() {
        return uci.load('healthchecks');
    },

    render: function() {
        var enabled = uci.get('healthchecks', 'main', 'enabled') === '1';
        var url = uci.get('healthchecks', 'main', 'url') || '';
        var interval = uci.get('healthchecks', 'main', 'interval_minutes') || '5';

        var m = E('div', { 'class': 'cbi-map' }, [
            E('h2', {}, _('Healthchecks.io')),
            E('div', { 'class': 'cbi-map-descr' }, _('Configure the Healthchecks.io heartbeat client.')),

            E('div', { 'class': 'cbi-section' }, [
                E('div', { 'class': 'cbi-section-node' }, [
                    E('div', { 'class': 'cbi-value' }, [
                        E('label', { 'class': 'cbi-value-title' }, _('Enabled')),
                        E('div', { 'class': 'cbi-value-field' }, [
                            E('input', {
                                id: 'hc-enabled',
                                type: 'checkbox',
                                checked: enabled
                            })
                        ])
                    ]),
                    E('div', { 'class': 'cbi-value' }, [
                        E('label', { 'class': 'cbi-value-title' }, _('Ping URL')),
                        E('div', { 'class': 'cbi-value-field' }, [
                            E('input', {
                                id: 'hc-url',
                                type: 'text',
                                style: 'width: 100%;',
                                value: url,
                                placeholder: 'https://hc-ping.com/your-uuid-here'
                            })
                        ])
                    ]),
                    E('div', { 'class': 'cbi-value' }, [
                        E('label', { 'class': 'cbi-value-title' }, _('Interval (minutes)')),
                        E('div', { 'class': 'cbi-value-field' }, [
                            E('input', {
                                id: 'hc-interval',
                                type: 'number',
                                min: '1',
                                style: 'width: 6em;',
                                value: interval
                            })
                        ])
                    ])
                ])
            ])
        ]);

        return m;
    },

    handleSave: function(ev) {
        var enabled = document.getElementById('hc-enabled').checked ? '1' : '0';
        var url = document.getElementById('hc-url').value.trim();
        var interval = document.getElementById('hc-interval').value;

        uci.set('healthchecks', 'main', 'enabled', enabled);
        uci.set('healthchecks', 'main', 'url', url);
        uci.set('healthchecks', 'main', 'interval_minutes', interval);

        return uci.save().then(function() {
            ui.addNotification(null, E('p', _('Configuration saved.')), 'info');
        });
    },

    handleSaveApply: function(ev) {
        var enabled = document.getElementById('hc-enabled').checked ? '1' : '0';
        var url = document.getElementById('hc-url').value.trim();
        var interval = document.getElementById('hc-interval').value;

        uci.set('healthchecks', 'main', 'enabled', enabled);
        uci.set('healthchecks', 'main', 'url', url);
        uci.set('healthchecks', 'main', 'interval_minutes', interval);

        return uci.save().then(function() {
            return uci.apply().then(function() {
                ui.addNotification(null, E('p', _('Configuration applied.')), 'info');
                return fs.exec('/etc/init.d/healthchecks', ['restart']).catch(function() {
                    // Service restart attempted
                });
            });
        });
    },

    handleReset: function() {
        return uci.load('healthchecks').then(L.bind(function() {
            window.location.reload();
        }, this));
    }
});