import React from 'react'
import { renderHook } from '@testing-library/react-native'
import useIsFirstRender from './useIsFirstRendering'
describe('Hooks', () => {
    it('useIsFirstRender', () => {
        const {result, rerender} = renderHook(() => useIsFirstRender())
        expect(result.current).toEqual(true)
        rerender(undefined)
        expect(result.current).toEqual(false)
    })
})