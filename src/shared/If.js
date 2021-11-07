function If({ rIf, children }) {
    if (!rIf)
        return null;

    return children;
};

export default If;