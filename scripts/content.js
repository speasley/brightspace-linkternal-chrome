setTimeout(() => {
    const isD2l = document.querySelector("body.d2l-body");

    const findElementsInShadowDom = (root, className, findFirst = false) => {
        let elements = [];

        if (root?.classList?.contains(className)) {
            if (findFirst) return root;
            elements.push(root);
        }

        if (root?.shadowRoot) {
            const foundInShadow = findElementsInShadowDom(root.shadowRoot, className, findFirst);
            if (findFirst && foundInShadow) return foundInShadow;
            elements = elements.concat(foundInShadow);
        }

        if (root?.children) {
            for (const child of root.children) {
                const foundInChildren = findElementsInShadowDom(child, className, findFirst);
                if (findFirst && foundInChildren) return foundInChildren;
                elements = elements.concat(foundInChildren);
            }
        }

        return findFirst ? null : elements;
    };

    const injectStylesIntoShadowDom = (element, css) => {
        if (element.shadowRoot) {
            const style = document.createElement('style');
            style.textContent = css;
            element.shadowRoot.appendChild(style);
        }
    };

    if (isD2l) {
        const rootElement = document.querySelector("body.d2l-body");
        
        // Simplified to a single function call
        const submissionListView = findElementsInShadowDom(rootElement, "d2l-consistent-evaluation-submission-list-view", true);

        if (submissionListView) {
            const submissionItems = findElementsInShadowDom(submissionListView, "d2l-submission-item-text");
            submissionItems.forEach(element => {
                let items = findElementsInShadowDom(element, "d2l-html-block-rendered");
                items.forEach(item => {
                    const links = item.querySelectorAll("a");
                    links.forEach(link => {
                        link.classList.add("brightspace-linkternal");
                        link.innerHTML += '<span class="link-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="height: auto; transform: translate(2px, -4px); width: 13px;"><path d="M14 5a.94.94 0 0 1-1-1 .94.94 0 0 1 1-1h6c.3 0 .5.1.7.3s.3.4.3.7v6a.94.94 0 0 1-1 1 .94.94 0 0 1-1-1V6.4l-9.3 9.3c-.4.4-1 .4-1.4 0s-.4-1 0-1.4L17.6 5H14zM3 7c0-1.1.9-2 2-2h5a.94.94 0 0 1 1 1 .94.94 0 0 1-1 1H5v12h12v-5a.94.94 0 0 1 1-1 .94.94 0 0 1 1 1v5c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7z" style="fill: currentColor;"/></svg></span>';
                        link.setAttribute("target", "_blank");
                    });
                });
            });
        }
    }
}, 4000);
