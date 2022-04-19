
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.6' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    // Map computer keys to accordion button layout
    const keyMap = {
      z: { row: 1, column: 1 },
      x: { row: 1, column: 2 },
      c: { row: 1, column: 3 },
      v: { row: 1, column: 4 },
      b: { row: 1, column: 5 },
      n: { row: 1, column: 6 },
      m: { row: 1, column: 7 },
      ',': { row: 1, column: 8 },
      '.': { row: 1, column: 9 },
      '/': { row: 1, column: 10 },
      a: { row: 2, column: 1 },
      s: { row: 2, column: 2 },
      d: { row: 2, column: 3 },
      f: { row: 2, column: 4 },
      g: { row: 2, column: 5 },
      h: { row: 2, column: 6 },
      j: { row: 2, column: 7 },
      k: { row: 2, column: 8 },
      l: { row: 2, column: 9 },
      ';': { row: 2, column: 10 },
      "'": { row: 2, column: 11 },
      w: { row: 3, column: 1 },
      e: { row: 3, column: 2 },
      r: { row: 3, column: 3 },
      t: { row: 3, column: 4 },
      y: { row: 3, column: 5 },
      u: { row: 3, column: 6 },
      i: { row: 3, column: 7 },
      o: { row: 3, column: 8 },
      p: { row: 3, column: 9 },
      '[': { row: 3, column: 10 },
    };

    const tone = {
      C: [16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01],
      Db: [17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92],
      D: [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64],
      Eb: [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03],
      E: [20.6, 41.2, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02],
      F: [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83],
      Gb: [23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96],
      G: [24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96],
      Ab: [25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44],
      A: [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0],
      Bb: [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31],
      B: [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07],
    };

    // Rows one, two and three with their notes and frequency for push and pull
    const one = [
      // Pull
      { id: '1-1-pull', name: 'D♭', frequency: tone.Db[4] },
      { id: '1-2-pull', name: 'G', frequency: tone.G[3] },
      { id: '1-3-pull', name: 'B♭', frequency: tone.Bb[3] },
      { id: '1-4-pull', name: 'D', frequency: tone.D[4] },
      { id: '1-5-pull', name: 'E', frequency: tone.E[4] },
      { id: '1-6-pull', name: 'G', frequency: tone.G[4] },
      { id: '1-7-pull', name: 'B♭', frequency: tone.Bb[4] },
      { id: '1-8-pull', name: 'D', frequency: tone.D[5] },
      { id: '1-9-pull', name: 'E', frequency: tone.E[5] },
      { id: '1-10-pull', name: 'G', frequency: tone.G[5] },
      // Push
      { id: '1-1-push', name: 'B', frequency: tone.B[3] },
      { id: '1-2-push', name: 'F', frequency: tone.F[3] },
      { id: '1-3-push', name: 'A', frequency: tone.A[3] },
      { id: '1-4-push', name: 'C', frequency: tone.C[4] },
      { id: '1-5-push', name: 'F', frequency: tone.F[4] },
      { id: '1-6-push', name: 'A', frequency: tone.A[4] },
      { id: '1-7-push', name: 'C', frequency: tone.C[5] },
      { id: '1-8-push', name: 'F', frequency: tone.F[5] },
      { id: '1-9-push', name: 'A', frequency: tone.A[5] },
      { id: '1-10-push', name: 'C', frequency: tone.C[6] },
    ];

    const two = [
      // Pull
      { id: '2-1-pull', name: 'G♭', frequency: tone.Gb[4] },
      { id: '2-2-pull', name: 'A', frequency: tone.A[3] },
      { id: '2-3-pull', name: 'C', frequency: tone.C[4] },
      { id: '2-4-pull', name: 'E♭', frequency: tone.Eb[4] },
      { id: '2-5-pull', name: 'G', frequency: tone.G[4] },
      { id: '2-6-pull', name: 'A', frequency: tone.A[4] },
      { id: '2-7-pull', name: 'C', frequency: tone.C[5] },
      { id: '2-8-pull', name: 'E♭', frequency: tone.Eb[5] },
      { id: '2-9-pull', name: 'G', frequency: tone.G[5] },
      { id: '2-10-pull', name: 'A', frequency: tone.A[5] },
      { id: '2-11-pull', name: 'C', frequency: tone.C[6] },
      // Push
      { id: '2-1-push', name: 'E', frequency: tone.E[4] },
      { id: '2-2-push', name: 'F', frequency: tone.F[3] },
      { id: '2-3-push', name: 'B♭', frequency: tone.Bb[3] },
      { id: '2-4-push', name: 'D', frequency: tone.D[4] },
      { id: '2-5-push', name: 'F', frequency: tone.F[4] },
      { id: '2-6-push', name: 'B♭', frequency: tone.Bb[4] },
      { id: '2-7-push', name: 'D', frequency: tone.D[5] },
      { id: '2-8-push', name: 'F', frequency: tone.F[5] },
      { id: '2-9-push', name: 'B♭', frequency: tone.Bb[5] },
      { id: '2-10-push', name: 'D', frequency: tone.D[6] },
      { id: '2-11-push', name: 'F', frequency: tone.F[6] },
    ];

    const three = [
      // Pull
      { id: '3-1-pull', name: 'B', frequency: tone.B[4] },
      { id: '3-2-pull', name: 'D', frequency: tone.D[4] },
      { id: '3-3-pull', name: 'F', frequency: tone.F[4] },
      { id: '3-4-pull', name: 'A♭', frequency: tone.Ab[4] },
      { id: '3-5-pull', name: 'C', frequency: tone.C[5] },
      { id: '3-6-pull', name: 'D', frequency: tone.D[5] },
      { id: '3-7-pull', name: 'F', frequency: tone.F[5] },
      { id: '3-8-pull', name: 'A♭', frequency: tone.Ab[5] },
      { id: '3-9-pull', name: 'C', frequency: tone.C[6] },
      { id: '3-10-pull', name: 'D', frequency: tone.D[6] },
      // Push
      { id: '3-1-push', name: 'D♭', frequency: tone.Db[4] },
      { id: '3-2-push', name: 'B♭', frequency: tone.Bb[3] },
      { id: '3-3-push', name: 'E♭', frequency: tone.Eb[4] },
      { id: '3-4-push', name: 'G', frequency: tone.G[4] },
      { id: '3-5-push', name: 'B♭', frequency: tone.Bb[4] },
      { id: '3-6-push', name: 'E♭', frequency: tone.Eb[5] },
      { id: '3-7-push', name: 'G', frequency: tone.G[5] },
      { id: '3-8-push', name: 'B♭', frequency: tone.Bb[5] },
      { id: '3-9-push', name: 'E♭', frequency: tone.Eb[6] },
      { id: '3-10-push', name: 'G', frequency: tone.G[6] },
    ];

    // Scales
    const BbScale = [
      ['1-3-pull', '1-4-pull'],
      ['2-3-pull', '2-4-pull'],
      ['3-2-pull', '3-3-pull'],
      ['2-4-pull', '2-5-pull'],
      ['3-3-pull', '2-6-pull'],
      ['1-6-pull', '1-7-pull'],
      ['2-6-pull', '2-7-pull'],
      ['1-7-pull', '1-8-pull'],
    ];

    const layout = { one, two, three };
    const buttonIdMap = [...one, ...two, ...three].reduce((acc, value) => {
      return { ...acc, [value.id]: value }
    }, {});

    const rowMap = { 1: 'one', 2: 'two', 3: 'three' };
    const rows = Object.values(rowMap);
    const toggleBellows = '1';

    /* src/App.svelte generated by Svelte v3.46.6 */

    const { Object: Object_1 } = globals;

    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[21] = list[i][0];
    	child_ctx[22] = list[i][1];
    	return child_ctx;
    }

    // (201:12) {#each Object.entries(activeButtonIdMap) as [id, value]}
    function create_each_block_2(ctx) {
    	let div2;
    	let div0;
    	let t0_value = /*value*/ ctx[22].name + "";
    	let t0;
    	let t1;
    	let div1;
    	let small;
    	let t2;
    	let t3_value = /*id*/ ctx[21].split('-')[0] + "";
    	let t3;
    	let br;
    	let t4;
    	let t5_value = /*id*/ ctx[21].split('-')[1] + "";
    	let t5;
    	let t6;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			small = element("small");
    			t2 = text("Row: ");
    			t3 = text(t3_value);
    			br = element("br");
    			t4 = text(" Col: ");
    			t5 = text(t5_value);
    			t6 = space();
    			attr_dev(div0, "class", "circle note");
    			add_location(div0, file, 202, 16, 5667);
    			add_location(br, file, 203, 51, 5762);
    			add_location(small, file, 203, 21, 5732);
    			add_location(div1, file, 203, 16, 5727);
    			attr_dev(div2, "class", "flex col");
    			add_location(div2, file, 201, 14, 5628);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, small);
    			append_dev(small, t2);
    			append_dev(small, t3);
    			append_dev(small, br);
    			append_dev(small, t4);
    			append_dev(small, t5);
    			append_dev(div2, t6);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*activeButtonIdMap*/ 2 && t0_value !== (t0_value = /*value*/ ctx[22].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*activeButtonIdMap*/ 2 && t3_value !== (t3_value = /*id*/ ctx[21].split('-')[0] + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*activeButtonIdMap*/ 2 && t5_value !== (t5_value = /*id*/ ctx[21].split('-')[1] + "")) set_data_dev(t5, t5_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(201:12) {#each Object.entries(activeButtonIdMap) as [id, value]}",
    		ctx
    	});

    	return block;
    }

    // (221:12) {#each layout[row].filter(({ id }) => id.includes(direction)) as button}
    function create_each_block_1(ctx) {
    	let div;
    	let t_value = /*button*/ ctx[18].name + "";
    	let t;
    	let div_class_value;
    	let div_id_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);

    			attr_dev(div, "class", div_class_value = `circle ${/*activeButtonIdMap*/ ctx[1][/*button*/ ctx[18].id]
			? 'active'
			: ''}`);

    			attr_dev(div, "id", div_id_value = /*button*/ ctx[18].id);
    			add_location(div, file, 221, 14, 6340);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);

    			if (!mounted) {
    				dispose = listen_dev(
    					div,
    					"mousedown",
    					function () {
    						if (is_function(/*handleClickNote*/ ctx[4](/*button*/ ctx[18].id))) /*handleClickNote*/ ctx[4](/*button*/ ctx[18].id).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*direction*/ 1 && t_value !== (t_value = /*button*/ ctx[18].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*activeButtonIdMap, direction*/ 3 && div_class_value !== (div_class_value = `circle ${/*activeButtonIdMap*/ ctx[1][/*button*/ ctx[18].id]
			? 'active'
			: ''}`)) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*direction*/ 1 && div_id_value !== (div_id_value = /*button*/ ctx[18].id)) {
    				attr_dev(div, "id", div_id_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(221:12) {#each layout[row].filter(({ id }) => id.includes(direction)) as button}",
    		ctx
    	});

    	return block;
    }

    // (218:8) {#each rows as row}
    function create_each_block(ctx) {
    	let div;
    	let h4;
    	let t0_value = /*row*/ ctx[15] + "";
    	let t0;
    	let t1;
    	let t2;
    	let each_value_1 = layout[/*row*/ ctx[15]].filter(/*func*/ ctx[7]);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			add_location(h4, file, 219, 12, 6226);
    			attr_dev(div, "class", "row " + /*row*/ ctx[15]);
    			add_location(div, file, 218, 10, 6190);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h4);
    			append_dev(h4, t0);
    			append_dev(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*activeButtonIdMap, layout, rows, direction, handleClickNote*/ 19) {
    				each_value_1 = layout[/*row*/ ctx[15]].filter(/*func*/ ctx[7]);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t2);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(218:8) {#each rows as row}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let t0;
    	let main;
    	let div15;
    	let div9;
    	let h1;
    	let t2;
    	let h20;
    	let t4;
    	let div5;
    	let div1;
    	let div0;
    	let h30;
    	let t6;
    	let select;
    	let option0;
    	let h21;
    	let option1;
    	let h22;
    	let option2;
    	let h23;
    	let t10;
    	let div2;
    	let h31;
    	let t12;
    	let ul;
    	let li0;
    	let t13;
    	let kbd0;
    	let t15;
    	let t16;
    	let li1;
    	let t17;
    	let kbd1;
    	let t19;
    	let kbd2;
    	let t21;
    	let t22;
    	let li2;
    	let t23;
    	let kbd3;
    	let t25;
    	let kbd4;
    	let t27;
    	let t28;
    	let li3;
    	let t29;
    	let kbd5;
    	let t31;
    	let kbd6;
    	let t33;
    	let t34;
    	let div3;
    	let h32;
    	let t36;
    	let button;
    	let t38;
    	let div4;
    	let h33;
    	let t40;
    	let p;
    	let t41;
    	let a0;
    	let t43;
    	let br;
    	let t44;
    	let a1;
    	let t46;
    	let t47;
    	let div8;
    	let div7;
    	let h34;
    	let t49;
    	let div6;
    	let t50;
    	let div14;
    	let div11;
    	let div10;
    	let t52;
    	let h24;
    	let t53;
    	let t54;
    	let div12;
    	let t55;
    	let div13;
    	let h4;
    	let t56;
    	let code;
    	let mounted;
    	let dispose;
    	let each_value_2 = Object.entries(/*activeButtonIdMap*/ ctx[1]);
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value = rows;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			t0 = space();
    			main = element("main");
    			div15 = element("div");
    			div9 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Keyboard Accordion";
    			t2 = space();
    			h20 = element("h2");
    			h20.textContent = "Play the diatonic button accordion with your computer keyboard!";
    			t4 = space();
    			div5 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Tuning";
    			t6 = space();
    			select = element("select");
    			option0 = element("option");
    			h21 = element("h2");
    			h21.textContent = "FB♭E♭ (Fa)";
    			option1 = element("option");
    			h22 = element("h2");
    			h22.textContent = "GCF (Sol) Not yet";
    			option2 = element("option");
    			h23 = element("h2");
    			h23.textContent = "EAD (Mi) Not yet";
    			t10 = space();
    			div2 = element("div");
    			h31 = element("h3");
    			h31.textContent = "How to play";
    			t12 = space();
    			ul = element("ul");
    			li0 = element("li");
    			t13 = text("Hold down ");
    			kbd0 = element("kbd");
    			kbd0.textContent = "1";
    			t15 = text(" to push the bellows. Default is pull.");
    			t16 = space();
    			li1 = element("li");
    			t17 = text("Row 1 starts with ");
    			kbd1 = element("kbd");
    			kbd1.textContent = "z";
    			t19 = text(" and ends with ");
    			kbd2 = element("kbd");
    			kbd2.textContent = ",";
    			t21 = text(" (comma)");
    			t22 = space();
    			li2 = element("li");
    			t23 = text("Row 2 starts with ");
    			kbd3 = element("kbd");
    			kbd3.textContent = "a";
    			t25 = text(" and ends with ");
    			kbd4 = element("kbd");
    			kbd4.textContent = "'";
    			t27 = text(" (apostrophe)");
    			t28 = space();
    			li3 = element("li");
    			t29 = text("Row 3 starts with ");
    			kbd5 = element("kbd");
    			kbd5.textContent = "w";
    			t31 = text(" and ends with ");
    			kbd6 = element("kbd");
    			kbd6.textContent = "[";
    			t33 = text(" (left bracket)");
    			t34 = space();
    			div3 = element("div");
    			h32 = element("h3");
    			h32.textContent = "Scales";
    			t36 = space();
    			button = element("button");
    			button.textContent = "B♭ Scale";
    			t38 = space();
    			div4 = element("div");
    			h33 = element("h3");
    			h33.textContent = "Credits";
    			t40 = space();
    			p = element("p");
    			t41 = text("Made with 💾 by ");
    			a0 = element("a");
    			a0.textContent = "Tania";
    			t43 = text(".");
    			br = element("br");
    			t44 = space();
    			a1 = element("a");
    			a1.textContent = "Open source";
    			t46 = text(".");
    			t47 = space();
    			div8 = element("div");
    			div7 = element("div");
    			h34 = element("h3");
    			h34.textContent = "Notes being played";
    			t49 = space();
    			div6 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t50 = space();
    			div14 = element("div");
    			div11 = element("div");
    			div10 = element("div");
    			div10.textContent = "This app is only available on a desktop!";
    			t52 = space();
    			h24 = element("h2");
    			t53 = text(/*direction*/ ctx[0]);
    			t54 = space();
    			div12 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t55 = space();
    			div13 = element("div");
    			h4 = element("h4");
    			t56 = text("Bellows ");
    			code = element("code");
    			code.textContent = "➔";
    			add_location(h1, file, 158, 6, 4045);
    			add_location(h20, file, 159, 6, 4079);
    			add_location(h30, file, 163, 12, 4239);
    			add_location(h21, file, 165, 43, 4319);
    			option0.__value = "fbe";
    			option0.value = option0.__value;
    			option0.selected = true;
    			add_location(option0, file, 165, 14, 4290);
    			add_location(h22, file, 166, 43, 4391);
    			option1.__value = "gcf";
    			option1.value = option1.__value;
    			option1.disabled = true;
    			add_location(option1, file, 166, 14, 4362);
    			add_location(h23, file, 167, 43, 4470);
    			option2.__value = "gcf";
    			option2.value = option2.__value;
    			option2.disabled = true;
    			add_location(option2, file, 167, 14, 4441);
    			add_location(select, file, 164, 12, 4267);
    			add_location(div0, file, 162, 10, 4221);
    			attr_dev(div1, "class", "flex");
    			add_location(div1, file, 161, 8, 4192);
    			add_location(h31, file, 173, 10, 4584);
    			add_location(kbd0, file, 175, 26, 4646);
    			add_location(li0, file, 175, 12, 4632);
    			add_location(kbd1, file, 176, 34, 4736);
    			add_location(kbd2, file, 176, 61, 4763);
    			add_location(li1, file, 176, 12, 4714);
    			add_location(kbd3, file, 177, 34, 4823);
    			add_location(kbd4, file, 177, 61, 4850);
    			add_location(li2, file, 177, 12, 4801);
    			add_location(kbd5, file, 178, 34, 4915);
    			add_location(kbd6, file, 178, 61, 4942);
    			add_location(li3, file, 178, 12, 4893);
    			add_location(ul, file, 174, 10, 4615);
    			add_location(div2, file, 172, 8, 4568);
    			add_location(h32, file, 183, 10, 5031);
    			add_location(button, file, 184, 10, 5057);
    			add_location(div3, file, 182, 8, 5015);
    			add_location(h33, file, 188, 10, 5146);
    			attr_dev(a0, "href", "https://tania.dev");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file, 190, 28, 5205);
    			add_location(br, file, 190, 82, 5259);
    			attr_dev(a1, "href", "https://github.com/taniarascia/accordion");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file, 191, 12, 5278);
    			add_location(p, file, 189, 10, 5173);
    			add_location(div4, file, 187, 8, 5130);
    			attr_dev(div5, "class", "information");
    			add_location(div5, file, 160, 6, 4158);
    			add_location(h34, file, 198, 10, 5475);
    			attr_dev(div6, "class", "currently-playing");
    			add_location(div6, file, 199, 10, 5513);
    			add_location(div7, file, 197, 8, 5459);
    			attr_dev(div8, "class", "information desktop-only");
    			add_location(div8, file, 196, 6, 5412);
    			attr_dev(div9, "class", "information-side");
    			add_location(div9, file, 157, 4, 4008);
    			attr_dev(div10, "class", "banner");
    			add_location(div10, file, 213, 8, 5977);
    			attr_dev(div11, "class", "mobile-only");
    			add_location(div11, file, 212, 6, 5943);
    			attr_dev(h24, "class", "direction");
    			add_location(h24, file, 215, 6, 6063);
    			attr_dev(div12, "class", "desktop-only accordion-layout");
    			add_location(div12, file, 216, 6, 6108);
    			add_location(code, file, 234, 20, 6736);
    			add_location(h4, file, 234, 8, 6724);
    			attr_dev(div13, "class", "desktop-only");
    			set_style(div13, "justify-content", "flex-end");
    			add_location(div13, file, 233, 6, 6655);
    			attr_dev(div14, "class", "keyboard-side");
    			add_location(div14, file, 211, 4, 5909);
    			attr_dev(div15, "class", "layout");
    			add_location(div15, file, 156, 2, 3983);
    			add_location(main, file, 155, 0, 3974);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div15);
    			append_dev(div15, div9);
    			append_dev(div9, h1);
    			append_dev(div9, t2);
    			append_dev(div9, h20);
    			append_dev(div9, t4);
    			append_dev(div9, div5);
    			append_dev(div5, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h30);
    			append_dev(div0, t6);
    			append_dev(div0, select);
    			append_dev(select, option0);
    			append_dev(option0, h21);
    			append_dev(select, option1);
    			append_dev(option1, h22);
    			append_dev(select, option2);
    			append_dev(option2, h23);
    			append_dev(div5, t10);
    			append_dev(div5, div2);
    			append_dev(div2, h31);
    			append_dev(div2, t12);
    			append_dev(div2, ul);
    			append_dev(ul, li0);
    			append_dev(li0, t13);
    			append_dev(li0, kbd0);
    			append_dev(li0, t15);
    			append_dev(ul, t16);
    			append_dev(ul, li1);
    			append_dev(li1, t17);
    			append_dev(li1, kbd1);
    			append_dev(li1, t19);
    			append_dev(li1, kbd2);
    			append_dev(li1, t21);
    			append_dev(ul, t22);
    			append_dev(ul, li2);
    			append_dev(li2, t23);
    			append_dev(li2, kbd3);
    			append_dev(li2, t25);
    			append_dev(li2, kbd4);
    			append_dev(li2, t27);
    			append_dev(ul, t28);
    			append_dev(ul, li3);
    			append_dev(li3, t29);
    			append_dev(li3, kbd5);
    			append_dev(li3, t31);
    			append_dev(li3, kbd6);
    			append_dev(li3, t33);
    			append_dev(div5, t34);
    			append_dev(div5, div3);
    			append_dev(div3, h32);
    			append_dev(div3, t36);
    			append_dev(div3, button);
    			append_dev(div5, t38);
    			append_dev(div5, div4);
    			append_dev(div4, h33);
    			append_dev(div4, t40);
    			append_dev(div4, p);
    			append_dev(p, t41);
    			append_dev(p, a0);
    			append_dev(p, t43);
    			append_dev(p, br);
    			append_dev(p, t44);
    			append_dev(p, a1);
    			append_dev(p, t46);
    			append_dev(div9, t47);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, h34);
    			append_dev(div7, t49);
    			append_dev(div7, div6);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div6, null);
    			}

    			append_dev(div15, t50);
    			append_dev(div15, div14);
    			append_dev(div14, div11);
    			append_dev(div11, div10);
    			append_dev(div14, t52);
    			append_dev(div14, h24);
    			append_dev(h24, t53);
    			append_dev(div14, t54);
    			append_dev(div14, div12);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div12, null);
    			}

    			append_dev(div14, t55);
    			append_dev(div14, div13);
    			append_dev(div13, h4);
    			append_dev(h4, t56);
    			append_dev(h4, code);

    			if (!mounted) {
    				dispose = [
    					listen_dev(document.body, "keypress", /*handleKeyPressNote*/ ctx[2], false, false, false),
    					listen_dev(document.body, "keyup", /*handleKeyUpNote*/ ctx[3], false, false, false),
    					listen_dev(document.body, "mouseup", /*handleClearAllNotes*/ ctx[5], false, false, false),
    					listen_dev(button, "click", /*playBbScale*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Object, activeButtonIdMap*/ 2) {
    				each_value_2 = Object.entries(/*activeButtonIdMap*/ ctx[1]);
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div6, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (dirty & /*direction*/ 1) set_data_dev(t53, /*direction*/ ctx[0]);

    			if (dirty & /*rows, layout, direction, activeButtonIdMap, handleClickNote*/ 19) {
    				each_value = rows;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div12, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function sleep(ms) {
    	return new Promise(resolve => setTimeout(resolve, ms));
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const audio = new (window.AudioContext || window.webkitAudioContext)();
    	const gainNode = audio.createGain();
    	gainNode.gain.value = 0.1;
    	gainNode.connect(audio.destination);

    	// State
    	let direction = 'pull';

    	let activeButtonIdMap = {};

    	// Handlers
    	function playTone(id) {
    		const { frequency } = buttonIdMap[id];
    		const oscillator = audio.createOscillator();
    		oscillator.type = 'square';
    		oscillator.connect(gainNode);
    		oscillator.frequency.value = frequency;
    		oscillator.start();
    		return { oscillator };
    	}

    	function stopTone(id) {
    		const { oscillator } = activeButtonIdMap[id];
    		oscillator.stop();
    	}

    	function handleToggleBellows(newDirection) {
    		if (direction !== newDirection) {
    			$$invalidate(0, direction = newDirection);
    			const newActiveButtonIdMap = { ...activeButtonIdMap };

    			// When switching the bellows
    			for (const [keyId, keyValues] of Object.entries(activeButtonIdMap)) {
    				// Remove existing value
    				keyValues.oscillator.stop();

    				// Must be reassigned in Svelte
    				delete newActiveButtonIdMap[keyId];

    				// Add the reverse value
    				const reverseKeyId = `${keyId.split('-')[0]}-${keyId.split('-')[1]}-${newDirection}`;

    				const { oscillator } = playTone(reverseKeyId);
    				newActiveButtonIdMap[reverseKeyId] = { oscillator, ...buttonIdMap[reverseKeyId] };
    			}

    			$$invalidate(1, activeButtonIdMap = newActiveButtonIdMap);
    		}
    	}

    	function updateActiveButtonMap(id) {
    		if (!activeButtonIdMap[id]) {
    			const { oscillator } = playTone(id);
    			$$invalidate(1, activeButtonIdMap[id] = { oscillator, ...buttonIdMap[id] }, activeButtonIdMap);
    		}
    	}

    	function handleKeyPressNote(e) {
    		if (e.key === toggleBellows) {
    			handleToggleBellows('push');
    			return;
    		}

    		const key = `${e.key}`.toLowerCase() || e.key;
    		const buttonMapData = keyMap[key];

    		if (buttonMapData) {
    			const { row, column } = buttonMapData;
    			const id = `${row}-${column}-${direction}`;
    			updateActiveButtonMap(id);
    		}
    	}

    	function handleKeyUpNote(e) {
    		if (e.key === toggleBellows) {
    			handleToggleBellows('pull');
    			return;
    		}

    		const key = `${e.key}`.toLowerCase() || e.key;
    		const buttonMapData = keyMap[key];

    		if (buttonMapData) {
    			const { row, column } = buttonMapData;
    			const id = `${row}-${column}-${direction}`;

    			if (activeButtonIdMap[id]) {
    				stopTone(id);

    				// Must be reassigned in Svelte
    				const newActiveButtonIdMap = { ...activeButtonIdMap };

    				delete newActiveButtonIdMap[id];
    				$$invalidate(1, activeButtonIdMap = newActiveButtonIdMap);
    			}
    		}
    	}

    	const handleClickNote = id => {
    		updateActiveButtonMap(id);
    	};

    	const handleClearAllNotes = () => {
    		for (const [keyId, keyValues] of Object.entries(activeButtonIdMap)) {
    			// Remove existing value
    			keyValues.oscillator.stop();
    		}

    		$$invalidate(1, activeButtonIdMap = {});
    	};

    	async function playNotesInScale(idSet) {
    		for (const id of idSet) {
    			// handleToggleBellows('pull')
    			if (!activeButtonIdMap[id]) {
    				const { oscillator } = playTone(id);
    				$$invalidate(1, activeButtonIdMap[id] = { oscillator, ...buttonIdMap[id] }, activeButtonIdMap);
    			}
    		}

    		await sleep(500);

    		for (const id of idSet) {
    			stopTone(id);

    			// Must be reassigned in Svelte
    			const newActiveButtonIdMap = { ...activeButtonIdMap };

    			delete newActiveButtonIdMap[id];
    			$$invalidate(1, activeButtonIdMap = newActiveButtonIdMap);
    		}
    	}

    	const playBbScale = async () => {
    		const reverse = [...BbScale].reverse();
    		reverse.shift();
    		const BbScaleBackwards = [...BbScale, ...reverse];

    		for (const idSet of BbScaleBackwards) {
    			await playNotesInScale(idSet);
    		}
    	};

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const func = ({ id }) => id.includes(direction);

    	$$self.$capture_state = () => ({
    		keyMap,
    		layout,
    		buttonIdMap,
    		rows,
    		toggleBellows,
    		BbScale,
    		sleep,
    		audio,
    		gainNode,
    		direction,
    		activeButtonIdMap,
    		playTone,
    		stopTone,
    		handleToggleBellows,
    		updateActiveButtonMap,
    		handleKeyPressNote,
    		handleKeyUpNote,
    		handleClickNote,
    		handleClearAllNotes,
    		playNotesInScale,
    		playBbScale
    	});

    	$$self.$inject_state = $$props => {
    		if ('direction' in $$props) $$invalidate(0, direction = $$props.direction);
    		if ('activeButtonIdMap' in $$props) $$invalidate(1, activeButtonIdMap = $$props.activeButtonIdMap);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		direction,
    		activeButtonIdMap,
    		handleKeyPressNote,
    		handleKeyUpNote,
    		handleClickNote,
    		handleClearAllNotes,
    		playBbScale,
    		func
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({ target: document.body });

    return app;

})();
//# sourceMappingURL=bundle.js.map
